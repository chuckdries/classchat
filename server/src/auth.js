import { Router } from 'express';
import bcrypt from 'bcrypt';
import { omit } from 'ramda';
import sqlite from 'sqlite';
import { v4 } from 'uuid';

const router = Router();
const dbPromise = sqlite.open('./database.sqlite');
const saltOrRounds = 10;

export const checkAuth = async (req, res, next) => {
  const { sessionToken } = req.cookies;
  if (!sessionToken) {
    next();
    return;
  }
  const db = await dbPromise;
  const user = await db.get('SELECT users.id, users.email, users.passwordHash FROM sessions WHERE sessions.sessionToken=? LEFT JOIN users ON sessions.userid = users.id');
  if (!user) {
    next();
    return;
  }
  const matches = await bcrypt.compare(req.password, user.passwordHash);
  if (!matches) {
    next();
    return;
  }
  req.user = omit(['passwordHash'], user);
  next();
};

export const requireAuth = (req, res, next) => {
  if (!req.user) {
    // next('not logged in');
    res.status(401).send('not logged in');
    return;
  }
  next();
};

router.get('/login', (req, res) => {
  if (req.user) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/register', (req, res) => {
  if (req.user) {
    res.redirect('/');
    return;
  }
  res.render('register');
});

router.post('/login', async (req, res) => {
  const error = 'email or password is incorrect';
  const {
    email,
    password,
  } = req.params;
  const db = await dbPromise;
  if (req.user) {
    res.redirect('/');
    return;
  }
  const user = await db.get('SELECT * FROM users WHERE email=?', email);
  if (!user) {
    res.render('login', { error });
    return;
  }
  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) {
    res.render('login', { error });
    return;
  }
  const sessionToken = v4();
  await db.run('INSERT INTO sessions (userid, sessionToken) VALUES (?,?)', [user.id, sessionToken]);
  res.cookie('sessionToken', sessionToken);
});

router.post('/register', async (req, res) => {
  const db = await dbPromise;
  const {
    email,
    password,
  } = req.params;
  if (req.user) {
    res.redirect('/');
  }
  const existingUser = await db.get('SELECT * FROM users WHERE email=?', email);
  if (existingUser) {
    res.render('register', { error: 'email already in use' });
  }
  const passwordHash = await bcrypt.hash(password, saltOrRounds);
  const statement = await db.run('INSERT INTO users (email, passwordHash) VALUES (?, ?)', [email, passwordHash]);
  const sessionToken = v4();
  await db.run('INSERT INTO sessions (userid, sessionToken) VALUES (?,?)', [statement.stmt.lastID, sessionToken]);
  res.cookie('sessionToken', sessionToken);
});

export default router;

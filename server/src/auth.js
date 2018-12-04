import { Router } from 'express';
import bcrypt from 'bcrypt';
import { omit } from 'ramda';
import sqlite from 'sqlite';
import { v4 } from 'uuid';

import { CLIENT_URL } from '../config';

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
  const user = await db.get('SELECT users.id, users.name, users.email, users.passwordHash FROM sessions LEFT JOIN users ON sessions.userid = users.id WHERE sessions.sessionToken=? ', sessionToken);
  if (!user) {
    next();
    return;
  }
  req.user = omit(['passwordHash'], user);
  next();
};

export const socketAuth = async (socket, next) => {
  console.log('here');
  const { sessionToken } = socket.request.cookies;
  console.log(sessionToken);
  if (!sessionToken) {
    next();
    return;
  }
  const db = await dbPromise;
  const user = await db.get('SELECT users.id, users.email, users.passwordHash FROM sessions LEFT JOIN users ON sessions.userid = users.id WHERE sessions.sessionToken=?', sessionToken);
  if (!user) {
    next();
    return;
  }
  socket.user = omit(['passwordHash'], user); // eslint-disable-line no-param-reassign
  console.log('foo');
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
    res.redirect(CLIENT_URL);
    return;
  }
  res.render('login');
});

router.get('/register', (req, res) => {
  if (req.user) {
    res.redirect(CLIENT_URL);
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
    res.redirect(CLIENT_URL);
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
    name,
    password,
  } = req.body;
  console.log(req.body);
  if (req.user) {
    // res.redirect('/');
    res.send('already registered');
    return;
  }
  const existingUser = await db.get('SELECT * FROM users WHERE email=?', email);
  if (existingUser) {
    // res.render('register', { error: 'email already in use' });
    res.send('email in use');
    return;
  }
  const passwordHash = await bcrypt.hash(password, saltOrRounds);
  const statement = await db.run('INSERT INTO users (email, name, passwordHash) VALUES (?, ?, ?)', [email, name, passwordHash]);
  const sessionToken = v4();
  await db.run('INSERT INTO sessions (userid, sessionToken) VALUES (?,?)', [statement.stmt.lastID, sessionToken]);
  res.cookie('sessionToken', sessionToken);
  res.send('success');
});

router.get('/validate', async (req, res) => {
  if (!req.user) {
    console.log('not logged in');
    res.send({
      loggedIn: false,
    });
    return;
  }
  res.send({
    loggedIn: true,
    currentUser: req.user,
  });
});

export default router;

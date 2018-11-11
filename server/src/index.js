import express from 'express';
import { Server } from 'http';
import path from 'path';
import socketio from 'socket.io';
import sqlite from 'sqlite';
import cookieParser from 'cookie-parser';

import authHandler, { checkAuth } from './auth';

const app = express();
const http = Server(app);
const io = socketio(http);

app.use(cookieParser());
app.set('view engine', 'twig');
app.use(checkAuth);

app.use(authHandler);

const dbPromise = Promise.resolve()
  .then(() => sqlite.open('./database.sqlite'))
  .then(db => db.migrate({ force: 'last' }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

const receiveMsg = async (msg) => {
  const db = await dbPromise;
  const statement = await db.run('INSERT INTO messages (message) VALUES ($message)', {
    $message: msg,
  });
  io.emit('message received', {
    id: statement.stmt.lastID,
    msg,
  });
};

io.on('connection', (socket) => {
  console.log('user connected'); // eslint-disable-line no-console
  socket.on('disconnect', () => {
    console.log('user disconnected'); // eslint-disable-line no-console
  });
  socket.on('message sent', receiveMsg);
});


http.listen(8080, () => {
  console.log('listening on http://localhost:8080'); // eslint-disable-line no-console
});

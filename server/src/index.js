import express from 'express';
import { Server } from 'http';
import path from 'path';
import socketio from 'socket.io';
import sqlite from 'sqlite';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';

import authHandler, { checkAuth, socketAuth } from './auth';

const app = express();
const http = Server(app);
const io = socketio(http);

app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(bodyParser.json());
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
  msg.userid = msg.userid ? msg.userid : 0; //eslint-disable-line

  const statement = await db.run('INSERT INTO messages (message, room, userid, author, date) VALUES ($message, $room, $userid, $author, $date)', {
    $message: msg.message,
    $room: msg.room,
    $userid: msg.userid,
    $author: msg.author,
    $date: msg.date,
  });

  io.to(msg.room).emit('message received', {
    id: statement.stmt.lastID,
    ...msg,
  });
};

io.use((socket, next) => {
  cookieParser()(socket.request, null, next);
});

io.use(socketAuth);

io.on('connection', (socket) => {
  console.log('user connected'); // eslint-disable-line no-console
  socket.on('disconnect', () => {
    console.log('user disconnected'); // eslint-disable-line no-console
  });
  socket.on('message sent', receiveMsg);
  socket.on('join room', (room) => {
    socket.join(room);
    // console.log(room);
  });
});

http.listen(8080, () => {
  console.log('listening on http://localhost:8080'); // eslint-disable-line no-console
});

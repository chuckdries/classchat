import express from 'express';
import { Server } from 'http';
import path from 'path';
import socketio from 'socket.io';
import sqlite from 'sqlite';

const app = express();
const http = Server(app);
const io = socketio(http);

const dbPromise = Promise.resolve()
  .then(() => sqlite.open('./database.sqlite', { Promise }))
  .then(db => db.migrate({ force: 'last' }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

const receiveMsg = async (msg) => {
  const db = await dbPromise;
  const result = await db.run('INSERT INTO messages (message) VALUES ($message)', {
    $message: msg,
  });
  debugger;
  io.emit('message received', {
    id: result.stmt.lastID,
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

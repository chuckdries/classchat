import express from 'express';
import { Server } from 'http';
import path from 'path';
import socketio from 'socket.io';

const app = express();
const http = Server(app);
const io = socketio(http);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected'); // eslint-disable-line no-console
  socket.on('disconnect', () => {
    console.log('user disconnected'); // eslint-disable-line no-console
  });
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});


http.listen(3000, () => {
  console.log('listening on http://localhost:3000'); // eslint-disable-line no-console
});

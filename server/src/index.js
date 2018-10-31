import express from 'express';
import { Server } from 'http';

const app = express();
const http = Server(app);

app.get('/', (req, res) => {
  res.send('hello world!');
});

http.listen(3000, () => { console.log('listening on http://localhost:3000'); });

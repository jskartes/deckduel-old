const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { resolve, dirname } = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config();
require('./config/database');

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {cors: {origin: 'http://localhost:3000'}});
io.on('connection', socket => {
  console.log(`User connected (socket id: ${socket.id})`);
  socket.on('disconnect', () => {
    console.log(`User disconnected (socket id: ${socket.id}`);
  });
});

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(resolve(dirname(__filename), '../build')));
app.use(require('./config/checkToken'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/chats', require('./routes/api/chats'));

app.get('/*', (req, res) => {
  res.sendFile(resolve(dirname(__filename), '../build', 'index.html'));
});

const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Server running on port ${port}`));

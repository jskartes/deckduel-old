const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
require('./config/database');

const { Server } = require('socket.io');
const { resolve, dirname } = require('path');
const { createServer } = require('http');

const app = express();
const server = createServer(app);

const io = new Server(server, {cors: {origin: 'https://localhost:3000'}});
io.on('connection', socket => {
  console.log('User connected...');
  socket.on('disconnect', () => console.log('User disconnected...'));
});

const port = process.env.PORT || 3001;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(resolve(dirname(__filename), '../build')));
app.use(require('./config/checkToken'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/chats', require('./routes/api/chats'));

app.get('/*', (req, res) => {
  res.sendFile(resolve(dirname(__filename), '../build', 'index.html'));
});

server.listen(port, () => console.log(`Server running on port ${port}`));

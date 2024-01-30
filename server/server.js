const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { resolve, dirname } = require('path');
const { createServer } = require('http');
require('dotenv').config();
require('./config/database');

const app = express();
app.use(cors());

const server = createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});
io.sockets.on('connection', socket => {
  console.log(`User connected (socket id: ${socket.id})`);
  socket.on('join', room => {
    console.log(`Socket ${socket.id} joining room ${room}`);
    socket.room = room;
    socket.join(room);
  });
  socket.on('message', message => {
    io.to(socket.room).emit('message', message);
  });
  socket.on('disconnect', () => {
    console.log(`User disconnected (socket id: ${socket.id})`);
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

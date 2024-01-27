const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
require('./config/database');

const socketIO = require('socket.io');
const path = require('path');
const http = require('http');

const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
  cors: {origin: 'https://localhost:3000'}
});
io.on('connection', socket => {
  console.log('User connected...');
  socket.on('chat message', message => io.emit('chat message', message));
  socket.on('disconnect', () => console.log('User disconnected...'));
});

const port = process.env.PORT || 3001;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(
  path.resolve(path.dirname(__filename), '../build')
));
app.use(require('./config/checkToken'));

app.use('/api/users', require('./routes/api/users'));

app.get('/*', (req, res) => {
  res.sendFile(
    path.resolve(path.dirname(__filename), '../build', 'index.html')
  );
});

server.listen(port, () => console.log(`Server running on port ${port}`));

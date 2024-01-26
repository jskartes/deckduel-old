const express = require('express');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();
require('./config/database');

const server = express();
const port = process.env.PORT || 3001;

server.use(morgan('dev'));
server.use(express.json());
server.use(express.static(
  path.resolve(path.dirname(__filename), '../build')
));

server.get('/*', (req, res) => {
  res.sendFile(
    path.resolve(path.dirname(__filename), '../build', 'index.html')
  );
});

server.listen(port, () => console.log(`Server running on port ${port}`));

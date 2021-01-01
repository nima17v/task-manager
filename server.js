const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./route');
const cors = require('cors');
const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use('/task', routes);

server.listen(process.env.PORT || 3000, function () {
    console.log('server is running');
});
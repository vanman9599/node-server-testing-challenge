const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../auth/auth-router.js');
const carsRouter = require('../cars/cars-router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('api/auth', authRouter);
server.use('api/cars', carsRouter);

server.get('/', (req, res) => {
    res.send("its alive")
})

module.exports = server;
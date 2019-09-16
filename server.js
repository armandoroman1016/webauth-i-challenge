const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const userRoutes = require('./routes/user-routes')

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use('/api/users', userRoutes)

server.get('/', (req, res) => {
    res.status(200).json({message: 'Hello'})
})

module.exports = server;

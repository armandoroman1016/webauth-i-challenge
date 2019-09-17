const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const session = require('express-session')
const KnexStoreSession = require('connect-session-knex')(session)

const userRoutes = require('./routes/user-routes')
const db= require('./data/db-config.js')


const sessionConfig = {
    name: 'crazyChimp',
    secret: process.env.SESSION_SECRET || 'top secret',
    cookie:{
        maxAge: 1000 * 60 * 5,
        secure: false,
        httpOnly: true
    },
    resave:false,
    saveUninitialized: false,
    store: new KnexStoreSession({
        knex: db,
        tablename: 'knexsessions',
        sidfieldname: 'sessionid',
        createtable: true,
        clearInterval: 1000 * 60 * 30
    })
}

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(session(sessionConfig))

server.use('/api/users', userRoutes)

server.get('/', (req, res) => {
    res.status(200).json({message: 'Hello'})
})

module.exports = server;

const router = require('express').Router()
const bcrypt = require('bcryptjs')
const db = require('../models/users-model')
const restricted = require('../middleware/restricted.js')

router.post('/register', (req, res) => {
    let credentials = req.body

    const hashed = bcrypt.hashSync(credentials.password, 14)

    credentials.password = hashed

    db.addUser(credentials)
        .then( user => res.status(201).json(user))
        .catch( err => res.status(500).json(err))

})

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    db.findByUserName(username)
    .then( user => {
        if(user && bcrypt.compareSync(password, user.password)){
            res.status(200).json(user)
        }else{
            res.status(401).json({message: 'invalid credentials'})
        }
    })
    .catch( err => res.status(500).json({message: 'hello error'}))
})

router.get('/', restricted, (req, res) => {
    db.find()
    .then(users => res.status(200).json(users))
    .catch( err => res.status(500).json(err))
})

module.exports = router
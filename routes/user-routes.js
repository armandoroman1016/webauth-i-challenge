const router = require('express').Router()
const bcrypt = require('bcryptjs')
const db = require('../models/users-model')

router.post('/register', (req, res) => {
    let credentials = req.body

    const hashed = bcrypt.hashSync(credentials.password, 14)

    credentials.password = hashed

    db.addUser(credentials)
        .then( user => res.status(201).json(user))
        .catch( err => res.status(500).json(err))

})

router.get('/', (req, res) => {
    db.find()
    .then(users => res.status(200).json(users))
    .catch( err => res.status(500).json(err))
})

module.exports = router
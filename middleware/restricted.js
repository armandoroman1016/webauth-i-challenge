const Users = require('../models/users-model')
const bcrypt = require('bcryptjs')

function restricted(req, res, next) {
    let { username, password } = req.headers;

    if(username && password){
        Users.findByUserName(username)
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    next();
                } else {
                    res.status(401).json({ message: 'Invalid Credentials' });
                }
            })
            .catch(error => {
                res.status(500).json(error);
            });
    }else{
        res.status(400).json({message: 'Missing credentials.'})
    }
}

module.exports = restricted
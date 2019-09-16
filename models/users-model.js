const db = require('../data/db-config')

module.exports = { 
    findById,
    addUser,
    find,
    findByUserName,
}

function find(){
    return db('users')
    .then(users => users)
    .catch( err => err)
}

function findById(id){
    return db('users')
    .where({id: id})
    .then( user => user)
    .catch( err => err);
}

function findByUserName(username){
    return db('users')
    .where({username: username})
    .first()
    .then( user => user)
    .catch( err => err);
}

function addUser(values){
    return db('users')
    .insert(values)
    .then(([id]) => findById(id))
    .catch( err => err)
}
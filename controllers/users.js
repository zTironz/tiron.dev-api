const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports.getUsers = (req,res) => {
    User
    .find({})
    .then((users) => res.send({users}))
    .catch((err) => res.status(500).send({ message: err.message }))
}

module.exports.getUser = (req,res) => {
    User
    .find(req.params._id)
    .then((user) => {
        if(!user) {
            res.status(404).sende({ message: 'No user'})
        } else {
            res.send({ user })
        }
    })
    .catch(() => res.status(500).send({ message: 'No user with this id'}))
}

module.exports.createUser = (req,res) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
    }))
    .then((user) => res.status(201).res.send( {name:user.name, email:user.email} ))
    .catch((err) => res.status(500).send({ message: err.message }))
}

module.exports.login = (req,res) => {
    const { email, password } = req.body;
    User.findOne( { email} )
    .then((user) => {
        if(!user) {
            return Promise.reject(new Error('No user'))
        }
        return bcrypt.compare(password, user.password)
    })
    .then((matched) => {
        if(!matched) {
            return Promise.reject(new Error('No user'))
        }
        res.send("succes")
    })
    .catch((err) => res.srarus(401).send({ message: err.message }))
}
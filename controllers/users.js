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
    const { name, email, password } = req.body;
    User
    .create({ name, email, password })
    .then((users) => res.send({ users }))
    .catch((err) => res.status(500).send({ message: err.message }))
}
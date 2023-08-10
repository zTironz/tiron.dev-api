const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req,res) => {
    User
    .find({})
    .then((users) => res.send({users}))
    .catch((err) => res.status(500).send({ message: err.message }))
}

module.exports.getUser = (req,res) => {
    User
    .findById(req.params.userId)
    .then((user) => {
        if(!user) {
            res.status(404).send({ message: 'No user'})
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
    .then((user) => res.status(201).send( {name:user.name, email:user.email} ))
    .catch((err) => res.status(500).send({ message: err.message }))
}

module.exports.login = (req,res) => {
    const { email, password } = req.body;
    return User.findUserByCredentials(email,password)
    .then((user) => {
        const token = jwt.sign(
            {_id: user._id}, 
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', 
            { expiresIn: '1d' }
            );
        return res.cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: true,
          })
            .send({ message: 'Вы залогинены!' })
            .end();
        // res.send({token})
    })
    .catch((err) => res.status(401).send({ message: err.message }))
}
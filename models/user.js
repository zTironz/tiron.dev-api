const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 15
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (v) => validator.isEmail(v),
            message: 'Incorrect email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
})

userSchema.statics.findUserByCredentials = function(email, password) {
    return this.findOne({ email })
    .then((user) => {
        if(!user) {
            return Promise.reject(new Error('No user'));
        }
        return bcrypt.compare(password, user.password)
        .then((matched) => {
            if(!matched) {
                return Promise.reject(new Error('No user'));
            }
            return user
        })
    })
    
}

module.exports = mongoose.model('user', userSchema)
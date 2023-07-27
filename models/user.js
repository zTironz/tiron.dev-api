const mongoose = require('mongoose');
const validator = require('validator');

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

module.exports = mongoose.model('user', userSchema)
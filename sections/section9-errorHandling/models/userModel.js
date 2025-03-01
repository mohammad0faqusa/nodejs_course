const mongoose = require('mongoose');
const {Schema} = mongoose ;
const validator = require('validator')

// name, email, photo, password, passwordConfirm 

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A name is required']
    },
    email: {
        type: String,
        required: [true, 'A email is required'],
        unique: true,
        lowercase: true,
        validator: [validator.isEmail, 'Please provide a valid email']
    },
    photo:{
        type: String,
    },
    password: {
        type: String,
        required: [true, 'a password is required'],
        minlength: 8,

    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password']
    }
})

const User = mongoose.model('User', userSchema); 

module.exports = User;
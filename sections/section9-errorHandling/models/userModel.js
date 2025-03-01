const mongoose = require('mongoose');
const {Schema} = mongoose ;
const validator = require('validator')
const bcrypt = require('bcrypt'); 



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
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            // This only works on CREATE AND SAVE!!!; it will not work in UPDATE! 
            validator: function(el) {
                return el === this.password; 
            }
        }
    },
    passwordChangedAt: Date
})
userSchema.methods.correctPassword = async function (candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword); 
}

userSchema.methods.changedPasswordAfter = async function (JWTTimestamp){
    let changedTimestapm;
    if(this.passwordChangedAt) {
        console.log(this.passwordChangedAt, JWTTimestamp)
        changedTimestapm = parseInt(this.passwordChangedAt.getTime()/1000, 10)
        console.log(changedTimestapm); 
    }
    console.log(JWTTimestamp < changedTimestapm)
    return JWTTimestamp < changedTimestapm; // 100 < 200 
}

userSchema.pre('save', async function(next) {
    // Only run this function if password was actually modified
    if(!this.isModified('password')) return next(); 

    this.password = await bcrypt.hash(this.password, 12);

    // Delete password confirm 
    this.passwordConfirm = undefined;
    next();
})


const User = mongoose.model('User', userSchema); 

module.exports = User;
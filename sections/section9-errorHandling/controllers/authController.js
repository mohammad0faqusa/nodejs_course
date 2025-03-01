const {promisify} = require('util')
const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');


exports.singup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        passwordChangedAt: req.body.passwordChangedAt
    });

    const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    })
}); 

exports.login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body ; 

    // 1) check if email and password exist 
    if (!email || !password) {
        return next(new AppError(`Please provide email and password `, 400))
    }

    // 2) check if user exists && password is correct
    const user = await User.findOne({email: email}).select('+password')

    if(!user || ! await user.correctPassword(password, user.password)) {
        return next(new AppError(`Uncorrect email or password `, 400))
    }

    console.log(user); 
    // 3) if everthing ok, send token to client 
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })

    res.status(200).json({
        status: 'success',
        data: {
            token        }
    })
})

exports.protect = catchAsync(async (req, res, next) => {
    let token; 
    // 1) getting the token and check of it's there 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]; 
    }

    if(!token){
        return next(new AppError(`Your are not logged in, please login to access`));
    }
    // 2) Verification token 

    const decoded =  jwt.verify(token, process.env.JWT_SECRET)
    
    // 3) Check if user still exists 

    const freshUser = await User.findById(decoded.id); 
    if(!freshUser) {
        
        return next(new AppError('The user belonging to this token does no longer exist. '))
    }

    // 4) check if user changed password after the token was issued
    
    if(await freshUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('You have changed the password, please re sign'))
    } 

    // 5) send user info, to later use 
    req.user = freshUser
    console.log(req.user); 

    next()
})
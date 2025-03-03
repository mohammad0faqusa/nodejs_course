const crypto = require('crypto')
const {promisify} = require('util')
const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');
const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000)
    ,httpOnly: true
};

if(process.env.NODE_ENV === 'production')
    cookieOptions.secure = true


const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id) ;

    res.cookie('jwt', token, cookieOptions);

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })

}
exports.singup = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);

    createSendToken(newUser, 201, res)
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

    createSendToken(user, 201, res);

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
    console.log('here is jwt : ', req.headers.authorization)
    console.log(process.env.JWT_SECRET)
    console.log('here is before decoded')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    console.log('here is decoded', decoded)
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

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // roles ['admin', 'lead-guide']. role = user 
        if (!roles.includes(req.user.role))
            return next(new AppError('You do not have permission to perform this action', 404))
    
        next() 
    }
}

exports.forgutPassword = catchAsync(async(req, res, next) => {
    //1) get user based on Posted email
    const user = await User.findOne({email: req.body.email})
    if (!user) {
        return next(new AppError('There is no user with email address', 404))
    }
    // 2) generate the random reset token
    const resetToken =  await user.createPasswordResetToken(); 
    console.log(resetToken); 
    await user.save({validateBeforeSave: false}) 
    // 3) send it to user's email 
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`

    const message = `Forgot your password? submit a PATH request with your new password and password confirm to: ${resetUrl}. \n if you didn't forget your password, please ignore this email!`; 

    try{
        await sendEmail({
            email: user.email,
            subject: 'Your password reset token (valid for 10min)',
            message
        })
    
        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!'
        })
    
    }catch(err){
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({validateBeforeSave: false});
        return next(new AppError('There was an error sending the email. Try again later!',500))
    }
})

exports.resetPassword = catchAsync(async (req, res, next) => {
    // 1) get user based on the token 
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex'); 

    const user = await User.findOne({
        passwordResetToken: hashedToken, 
        passwordResetExpires: {$gt: Date.now()}
    })
    // 2) if token has not expired, and there is user, set the new password
    if (!user) {
        return next(new AppError('Token is invalid or has expired', 400))
        // 3) update changedPasswordAt porperty for the user 
        // 4) log the user in, send JWT 
    }

    user.password = req.body.password
    user.passwordconfirm = req.body.passwordConfirm
    user.passwordResetToken = undefined; 
    user.passwordResetExpires = undefined; 
    await user.save(); 

    createSendToken(newUser, 201, res)

})

exports.updatePassword = catchAsync(async (req, res, next) => {
    
    const user = await User.findById(req.user.id).select('+password');

    if(!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return next(new AppError('Your current password is wrong.', 401))
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm; 
    await user.save(); 
    
    createSendToken(user, 201, res)
     
})
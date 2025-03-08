const Tour = require('./../models/tourModel')
const User = require('./../models/userModel')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')

exports.getOverview = catchAsync(async(req, res) => {
    // 1) get the tour data from the collection 
    const tours = await Tour.find(); 
    // 2) build template 

    // 3) render that template using tour data from 1
    res.status(200).render('overview', {
        title: 'All tours',
        tours
    })
})  

exports.getTour = async (req, res, next) => {
    // 1) get the data, for the requested tour (including reviews and guides)
    const tour = await Tour.findOne({slug: req.params.slug}).populate({
    path: 'reviews',
    fields: 'review rating user'
    })
    console.log('request url : ', req.originalUrl)
    if(!tour)
        return next(new AppError('There is no tour with that name.', 404))

    // console.log(tour); 
    // 2) build template 
    // 3) Render template using data from 1) 
    return res.status(200).render('tour', {tour})
}

exports.login = catchAsync(async (req, res) => {
    res.status(201).render('login', {
        title: 'log into your account'
    })
})

exports.getAccount = (req, res) => {
    res.status(200).render('account', {
        title: 'Tour account',
    })
}

exports.updateUserData = async (req, res, next) => {
    console.log('Updating data', req.body)
    const updatedUser = await User.findByIdAndUpdate(req.user.id, {
        name: req.body.name,
        email: req.body.email 
    },{
        new: true, 
        runValidators: true
    });
    res.status(200).render('account', {
        user: updatedUser,
        title: 'Tour account',
    })
}
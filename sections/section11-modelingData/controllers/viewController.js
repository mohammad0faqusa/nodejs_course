const Tour = require('./../models/tourModel')
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

exports.getTour = async (req, res) => {
    // 1) get the data, for the requested tour (including reviews and guides)
    const tour = await Tour.findOne({slug: req.params.slug}).populate({
        path: 'reviews',
        fields: 'review rating user'
    })
    // console.log(tour); 
    // 2) build template 
    // 3) Render template using data from 1) 
    res.status(200).render('tour', {title: tour.name, tour})
}

exports.login = catchAsync(async (req, res) => {
    res.status(201).render('login', {
        title: 'log into your account'
    })
})
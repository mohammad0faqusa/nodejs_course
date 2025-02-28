const fs = require('fs');
const Tour = require('./../models/toursModels')
const databaseTools = require('./../database')
const APIFeatures = require('./../utils/apiFeatures')
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');

// const tours =JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)); 

exports.aliasTopTours = (req, res, next)=>{
    req.query.limit = '5' ;
    req.query.sort = '-ratingsAverage,price'
    req.query.fields= 'name,price,ratingsAverage,summary,difficulty'
    next() 
}

exports.getAllTours = catchAsync (async (req, res, next)=>{
    
    const features = new APIFeatures(Tour.find(),req.query)
    .filter().sort().limitFields().pagination()

    const tours = await features.query 
    // console.log(tours.length); 
    res.status(201).json({  
        status: "success",
        data:{
            tours
        }
    })
})

exports.getTour = catchAsync(async (req, res,next)=>{
    const tour = await Tour.findById(req.params.id);

    if(!tour) {
        return next(new AppError(`No tour found with that ID : ${req.params.id}`))
    }
    res.status(201).json({
        status: "success",
        data: {
            tour
        }
    })
})

exports.updateTour = catchAsync(async (req, res, next)=>{
    const id = req.params.id.toString();
    console.log(id); 
    const updatedTour = await Tour.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    })
    res.status(201).json({
        status: "success",
        data: {
            updatedTour
        }
    })
});

exports.deleteTour = catchAsync(async (req, res, next)=>{
    const id = req.params.id.toString();
    const tour = await Tour.findByIdAndDelete(id); 
    
    if(!tour) {
        return next(new AppError(`No tour found with that ID : ${req.params.id}`))
    }

    res.status(201).json({
        status: "success",
        data: {
            tour
        }
    })
});

exports.addTour = catchAsync(async (req, res, next)=>{
    const tour = await databaseTools.createDocument(Tour, req.body)
        res.status(201).json({
            status: "success",
            data: {
                tour
            }
    })
});

exports.getTourStats = catchAsync(async (req, res)=>{
        const stats = await Tour.aggregate([
            {
                $match: {ratingsAverage: {$gte: 4.5}}
            },
            {
                $group: {
                    _id: '$difficulty',
                    num: {$sum: 1},
                    avgRating: {$avg: '$ratingAverage'},
                    avgPrice: {$avg: '$price'},
                    minPrice: {$min: '$price'},
                    maxPrice: {$max: '$price'}
                }
            },
            {
                $sort: {avgPrice:1}
            },
            {
                $match: {_id :{$ne: 'easy'}}
            }
        ]);
        res.status(200).json({
            status: "success",
            data: {
                stats
            }
        })
})

exports.getMonthlyPlan = catchAsync(async (req, res)=>{
        const year = req.params.year * 1;
        console.log(year); 
        const plan = await Tour.aggregate([
            {
                $unwind: '$startDates'
            },
            {
                $match: {
                    startDates:{
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    } 
                }
            },
            {
                $group: {
                    _id: {$month: '$startDates'},
                    numToursStarts: {$sum : 1},
                    tours: {$push: '$name'}
                }
            },
            {
                $addFields: {month: '$_id'}
            },
            {
                $project: {
                    _id: 0
                }
            },
            {
                $sort: {
                    numToursStarts: -1
                }
            },
            {
                $limit: 12
            }
        ]); 

        res.status(201).json({
            status: 'success',
            data:{
                plan
            }
        })
})
const fs = require('fs');
const Tour = require('./../models/toursModels')
const databaseTools = require('./../database')
const APIFeatures = require('./../utils/apiFeatures')

// const tours =JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)); 

exports.aliasTopTours = (req, res, next)=>{
    req.query.limit = '5' ;
    req.query.sort = '-ratingsAverage,price'
    req.query.fields= 'name,price,ratingsAverage,summary,difficulty'
    next() 
}

exports.getAllTours = async (req, res)=>{
    try{
        const features = new APIFeatures(Tour.find(),req.query)
        .filter().sort().limitFields().pagination()

        const tours = await features.query 

        res.status(201).json({  
            status: "success",
            data:{
                tours
            }
        })
    }catch (err) {
        console.log(err)
        res.status(404).json({
            status: "fail",
            message: "could not get the tours",
            error: err.message
        })
    }  
}

exports.getTour = async (req, res)=>{
    try{
        const tour = await Tour.findById(req.params.id);
        res.status(201).json({
            status: "success",
            data: {
                tour
            }
        })
    }catch(err){
        res.status(404).json({
            status: "fail",
            message: "could not find the tour"
        })
    }
}

exports.updateTour = async (req, res)=>{
    try{
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
    }catch(err){
        console.log(err); 
        res.status(404).json({
            status: "fail",
            message: "could not update the tour",
        })
    }
};

exports.deleteTour = async (req, res)=>{
    try{
        const id = req.params.id.toString();
        const deletedTour = await Tour.findByIdAndDelete(id); 
        if (deletedTour)
            res.status(201).json({
                status: "success",
                data: {
                    deletedTour
                }
            })
        else {
            res.status(404).json({
                status: "fail",
                message: "could not find the tour to delete"
            })
        }
    }catch(err){
        console.log(err.message); 
        res.status(404).json({
            status: "fail",
            message: "error in deleting operation",
            error: err.message
        })
    }
   
};

exports.addTour = async (req, res)=>{
    try{
        const tour = await databaseTools.createDocument(Tour, req.body)
        res.status(201).json({
            status: "success",
            data: {
                tour
            }
    })
    } catch(err){
        res.status(500).json({
            status: "fail",
            message: "could not create new document",
            error: err.message 
        })
    }
    
};

exports.getTourStats = async (req, res)=>{
    try{
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
    } catch(err){
        res.status(404).json({
            status: "fail",
            message: "could not find the stats" 
        })
    }
}

exports.getMonthlyPlan = async (req, res)=>{
    try{
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
    }catch(err){

    }
}
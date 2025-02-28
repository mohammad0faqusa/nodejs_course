
const Tour = require('./../model/tourModel')

exports.checkId = async (req, res, next) => {
    try{
        const tourId = req.params.id; 
        const tour = await Tour.findById(tourId);

        if(!tour){
            res.status(404).json({
                status: 'fail',
                message: 'could not find the tour'
            })
        } else{
            next()
        }
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: 'error in finding the tour id'
        })
    }
}

exports.getAllTours = async (req, res)=>{
    try{
        const tours = await Tour.find();
        res.json(tours); 

    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.addTour = async (req, res) => {
    try{
        const tour = new Tour(req.body);
        await tour.save();
        res.json(tour); 
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.getTour = async (req,res) => {
    const tour = await Tour.findById(req.params.id)
    res.status(201).json({
        status: 'success',
        data: {
            tour
        }
    })
}

exports.updateTour = async (req,res) => {
    try{
        const tourId = req.params.id ;
        console.log(req.query);

        const tour = await Tour.findByIdAndUpdate(tourId, req.query)
        res.status(201).json({
            status: 'success',
            data: {
                tour
            }
        })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}
exports.deleteTour = async (req,res) => {
    try{
        const tourId = req.params.id;
        const tour = await Tour.findByIdAndDelete(tourId);
        res.status(201).json({
            status: 'success',
            message: 'the tour is deleted successfully',
            data: {
                tour
            }
        })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}
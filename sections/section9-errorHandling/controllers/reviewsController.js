const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync')


exports.getAllReviews = catchAsync(async (req, res, next)=>{
    const reviews = await Review.find();

    res.status(200).json({
        status: 'success',
        results: reviews.length,
        data: {
            reviews
        }
    })
})
exports.createReview = catchAsync(async (req, res, next)=>{
    const newReview = await Review.create(req.body);

    res.status(200).json({
        status: 'success',
        data: {
            newReview
        }
    })
})

exports.getReview = catchAsync(async (req, res, next)=>{
    console.log(req.params.id)
    const review = await Review.findById(req.params.id);
    console.log(review); 
    res.status(200).json({
        status: 'success',
        data: {
            review
        }
    })
})

exports.updateReview = catchAsync(async (req, res, next)=>{
    const review = await Review.findByIdAndUpdate(req.params.id, {});
    
    res.status(200).json({
        status: 'success',
        data: {
            review
        }
    })
})

exports.deleteReview = catchAsync(async (req, res, next)=>{
    const review = await Review.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
        status: 'success',
        data: {
            review
        }
    })
})
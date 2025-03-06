// review / rating / created At / ref to tour / ref to user 
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'the name cannot be empty']
    }, 
    rating: {
        type: Number, 
        min: 0,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    tour: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Tour',
        required: [true, 'the review must belong to tour']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: [true, 'the review must belong to a user']
    }  
    
})

reviewSchema.set('toJSON', { virtuals: true });
reviewSchema.set('toObject', {virtuals: true});


reviewSchema.pre(/^find/, function(next){
    this.populate({ path: 'tour', select: 'name' });
    this.populate({ path: 'user', select: 'name photo' });
    next(); 
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review; 
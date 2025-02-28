const mongoose = require('mongoose')
// var validate = require('mongoose-validator')

const { Schema } = mongoose;

const tourSchema = new Schema({
  name: {
    type: String,
    required: [true, 'the name of tour is required'],

  },
  price: {
    type: Number, 
    required: [true, 'the price is required']
  },
  rating: {
    type: Number, 
    default: 4.5
  },
  ratingsAverage: {
    type: Number,
    required: [true, 'ratings average is required']
  }
  
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour; 
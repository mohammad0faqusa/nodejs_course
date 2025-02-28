const dotenv = require('dotenv');
const AppError = require('./../utils/appError')

dotenv.config({path: './../config.env'})

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`
  return new AppError(message, 400); 
}

const handleDuplicateField = err => {
  const message = `Duplicated fields : ${JSON.stringify(err.errorResponse.keyValue)}`
  return new AppError(message, 400)
}

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
}

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    // Operational error, trusted error : send to the client
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

  } else {
    // non-operational, don't leak error's details  

    //1) log error 
    console.error('ERROR 💥')

    //2) send generic message 
    res.status(500).json({
      status: 'error',
      message: 'something went very wrong!'
    })
  }
  
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500; // 500 is server error
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
      sendErrorDev(err, res)
    } else if (process.env.NODE_ENV === 'production') { 

      let error = JSON.parse(JSON.stringify(err));
  
      if (error.name === 'CastError') error = handleCastErrorDB(error);
      if (error.code === 11000) error = handleDuplicateField(error); 
      console.log(error); 
      sendErrorProd(error, res)
    }
  }
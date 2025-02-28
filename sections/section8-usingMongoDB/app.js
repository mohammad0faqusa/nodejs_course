const express = require('express'); 
const morgan = require('morgan');

const AppError = require('./utils/appError');
const {globalError} = require('./controllers/errorControllers')

const hiMiddle = require('./middlewares/hiMiddle')
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express(); 

app.use(morgan('dev'));
app.use(express.json()); 
app.use(express.static(`${__dirname}/public`));
// app.use(hiMiddle);
app.use('/api/v1/tours', tourRouter); 
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next)=>{
    next(new AppError(`Cant find ${req.originalUrl} on the server`, 404)); 
})

app.use(globalError)

module.exports = app; 
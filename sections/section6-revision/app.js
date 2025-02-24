const express = require('express');
const dotenv  = require('dotenv'); 
const morgan = require('morgan'); 
const toursRoutes = require('./routes/toursRoutes')
const usersRoutes = require('./routes/usersRoutes')

dotenv.config({path:'./.env'}); 

const app = express(); 
const port = process.env.SERVER_PORT

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('./public'))

app.use('/api/v1/tours', toursRoutes); 
app.use('/api/v1/users', usersRoutes); 

app.listen(port , ()=>{
    console.log('the server is running on port' + port ); 
})
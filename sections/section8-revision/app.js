const express = require('express');
const toursRoutes = require('./routes/toursRoutes')


const app = express();

app.use(express.json());
app.use('/tours', toursRoutes); 


module.exports = app; 
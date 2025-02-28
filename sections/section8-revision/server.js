const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({path: `${__dirname}/.env`})

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose connection open to MongoDB Atlas.');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected.');
});


const port = 3000 ;
app.listen(port, ()=>{
    console.log(`The server is running on port ${port}`)
})
const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('./../../models/toursModels')
const dotenv = require('dotenv');
dotenv.config({path:'./../../.env'});

const DB = process.env.MONGO_CONNECTION_STRING.replace('<PASSWORD>', process.env.DATABASE_PASSWORD).replace('<DATABASE_NAME>', process.env.DATABASE_NAME)

mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }).then(()=>console.log('the data base is connected successfully'));


const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'))

//import data to database 
const importData = async ()=>{
    try{
        await Tour.create(tours)
        console.log('the data is imported successfully')
    }catch(err){
        console.log(err.message); 
    }
    process.exit()
}

const deleteData = async()=>{
    try{
        await Tour.deleteMany();
        console.log('the data is deleted successfully');
    }catch(err){
        console.log('error in deleteing data : ', err.message)
    }
    process.exit()
}

if (process.argv[2] === '--import'){
    importData(); 
} else if (process.argv[2] === '--delete') {
    deleteData();
}
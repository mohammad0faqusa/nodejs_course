const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./.env'});

const DB = process.env.MONGO_CONNECTION_STRING.replace('<PASSWORD>', process.env.DATABASE_PASSWORD).replace('<DATABASE_NAME>', process.env.DATABASE_NAME)

mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }).then(()=>console.log('the data base is connected successfully'));

exports.createDocument = async function (Model, dataObject) {
  try {
      const newDocument = new Model(dataObject);
      const savedDoc = await newDocument.save();
      console.log("Document inserted:", savedDoc);
      return await savedDoc
      
  } catch (error) {
      console.error("Error inserting document:", error);
      throw new Error(error) 
  }
}
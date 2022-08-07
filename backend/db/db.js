const mongoose = require('mongoose');
require('dotenv').config();
console.log("the uri is : ",process.env.MONGO_URI);

const connectDB = async() => {
    try{
        console.log("in the try block");
        const conn = await mongoose.connect(process.env.MONGO_URI , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDb connected successfully : ${conn.connection.host}`);
    }catch(error){
        console.log(`Error : ${error.message}`);
        process.exit();
    }
}

module.exports = connectDB;
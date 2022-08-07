const asyncHandler = require('express-async-handler');
const mongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const uri = process.env.MONGO_URI;
const client = new mongoClient(uri);
console.log("you are in the data controller");

const commonData = asyncHandler(async(req ,res) => {
    console.log("you called common data route");
    try{
        console.log("you are in common data fetching route");
        const database = client.db("finndit_data");
        const collection = database.collection("common");
        const cursor = collection.find();
        const Data = [];

        await cursor.forEach(function(doc){
            Data.push(doc);
        })
        res.json(Data);
        res.status(200);
    }
    catch(e){
        throw new Error(e.message);
    }
})

const searchdata = asyncHandler(async(req,res) => {
    const city = req.query.city;
    console.log("you are in data fetching route");
    console.log("name of the city : ",city);
    try {
      const database = client.db("finndit_data");
      const collection = database.collection(city);

      const cursor = collection.find();
      const Data = [];

      await cursor.forEach(function (doc) {
        Data.push(doc);
      });

      res.json(Data);
      res.status(200);
    } catch (e) {
      throw new Error(e.message);
    }
})

const login = asyncHandler(async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  try {
    const database = client.db("finndit_data");
    const collection = database.collection("admin");
    const cursor = collection.find();
    const Data = [];

    await cursor.forEach(function (obj) {
      Data.push(obj);
    });

    if (name === Data[0].name && password === Data[0].password) {
      res.status(200);
      res.send("Login successful");
    } else {
      res.status(200);
      res.send("Bad credentials. Please try again");
    }
  } catch (e) {
    res.status(400);
    throw new Error(e.message);
  }
});

module.exports = {commonData , searchdata , login};
const express = require('express');
const connectDB = require('./db/db');
const routes = require('./routes/routes');
cors = require('cors');

const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use("/" , routes);

app.listen(3000 , console.log("server started successfully at port 5000"))
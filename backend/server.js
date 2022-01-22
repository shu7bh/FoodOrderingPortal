const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const MONGO_PORT = 27017;
const DB_NAME = "FoodOrderingPortal"

// routes
let BuyerRouter = require("./routes/Buyers.js");
let VendorRouter = require("./routes/Vendors.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('dotenv').config();
// Connection to MongoDB
//const uri = process.env.ATLAS_URI;
mongoose.connect('mongodb://127.0.0.1:' + MONGO_PORT + '/' + DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// setup API endpoints
app.use("/buyer", BuyerRouter);
app.use("/vendor", VendorRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "FoodOrderingPortal"

// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/Users");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('dotenv').config();
// Connection to MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/user", UserRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

const express = require("express");
const app = express()
const cors = require("cors");
require('dotenv').config();
const mongoose = require("mongoose");
//middleware

app.use(express.json()) //req.body
app.use(cors())

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

//ROUTES//


//register and login routes

app.use("/auth", require("./routes/jwtAuth"));

//dashboard route

app.use("/dashboard", require("./routes/dashboard"));

app.listen(5000, () =>{
    console.log("server is running on port 5000");
});
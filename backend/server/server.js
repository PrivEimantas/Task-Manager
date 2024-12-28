const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const mongoose = require('mongoose');
const uri = process.env.ATLAS_URI
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open',() => {
  console.log("---mongodb connection established-!!");
})
// get driver connection
const dbo = require("./db/conn");


//routes
app.use('/login',require("./routes/login"));
app.use('/users',require("./routes/record"));
app.use('/newPage',require("./routes/tasks"));


//middleware
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

app.listen(port, async () => {
  // perform a database connection when server starts
  await dbo.connectToServer(function (err) {
    if (err) console.error(err);
   });
  console.log(`Server is running on port: ${port}`);
});
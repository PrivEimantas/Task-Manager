const express = require("express");
const User = require('../models/users');
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const loginRoutes = express.Router();



//For authentication

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key'; 


// This will help us connect to the database
const dbo = require("../db/conn");
const generateToken = require("../utils/generateToken");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


loginRoutes.post('/',async (req,res)=>{

  //NOTE: the 'name' must be same as sent from Navbar
  const { username, password } = req.body;
  
  console.log("LOGGING IN");
  console.log("in login, username: ",username);
  console.log("in login, password:",password);
  
  //db_connect.findOne({username: username});
    try{
      // Find user by username
    const user = await User.findOne({ username: username });
    
    if (!user) {
      // No user found
      return res.status(404).json({ message: 'User not found' });
    }
    //const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    
    //generate token when authenticating the user
    res.status(200).json({ 
      token:generateToken(user._id), 
      user: user });
    //res.json({token});

    } catch (error) {
      // Handle server error
      res.status(500).json({ message: 'Server error', error: error.message });
  }
    

    //.then(users => res.json(users))
    //.catch(err =>res.status(400).json('Error: '+err) );
    
 /* res.json({mssg:'Get all records'})*/

});



module.exports = loginRoutes;
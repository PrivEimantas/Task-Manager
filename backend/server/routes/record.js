const express = require("express");
const User = require('../models/users');
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
const generateToken = require("../utils/generateToken");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


//  !!!!!!!!!!!!!!!!           USER RECORDS   !!!!!!!!!!!!!!!!!!!!!!


//get all records
recordRoutes.get('/',async (req,res)=>{
    let db_connect = dbo.getDb();
    try {
        var records = await db_connect
          .collection("records")
          .find({})
          .toArray();
        res.json(records);
      } catch (e) {
        console.log("An error occurred pulling the records. " + e);
      }
   /* res.json({mssg:'Get all records'})*/
});



//get one record

recordRoutes.get('/:id',(req,res)=>{
    User.findById(req.params.id)
    .then(users => res.json(users))
    .catch(err =>res.status(400).json('Error: '+err) );
    //res.json({mssg:'Get single record'})
})




//post method
recordRoutes.post('/add', async (req,res)=>{
   
    let db_connect = dbo.getDb();
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);
    console.log(password);
    let myobj = {
        name: req.body.name,
        password:req.body.password,
    };
    const collection = db_connect.collection("usersdb.users");
    const newUser = new User({
      username,
      password,
    });
    newUser.save()
    //.then( () => res.json('New User Added-!'))
    .catch(err => res.status(400).json('Error: '+err));

    

    //generate token upon when a user is added
    if (newUser){
      res.status(201).json({
        _id:newUser._id,
        name: newUser.username,
        password:newUser.password,
        token: generateToken(newUser._id),
      });
      
    }
    else {
      res.status(400);
      throw new Error("error occured! in /add");
    }
      
    try {
        
        
        db_connect.collection("users").find().toArray(function(err, res) {
            if ( res.length > 0 )
              {
                  console.log("Exist!!!");
              }
              else
              {
                  console.log("Not Exist!!!");
              }
              db_connect.close();
            });
    } catch (error) {
        console.log(error);
    }
    
   
})

/*
recordRoutes.route("/record/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };
    db_connect.collection("records").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
   });
 */

module.exports = recordRoutes;
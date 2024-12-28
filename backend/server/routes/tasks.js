const express = require("express");
const Task = require('../models/tasks');
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const tasksRoutes = express.Router();

//For authentication

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key'; 


// This will help us connect to the database
const dbo = require("../db/conn");
const generateToken = require("../utils/generateToken");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


tasksRoutes.post('/upload',async (req,res)=>{ // When a user creates a task, its saved into the database

    let db_connect = dbo.getDb();
    let myobj = {
        id: req.body.form.id,
        date:req.body.form.date,
    };

    const username = req.body.userInfoOut.user.username;
    const id = req.body.form.id;
    const date = req.body.form.date;
    const priority = req.body.form.priority;
    const title = req.body.form.title;
    const description = req.body.form.description;
    const done = req.body.form.done;
    const percent = req.body.form.percent;

    console.log(username);

    const newTask = new Task({
        username,
        id,
        date,
        priority,
        title,
        description,
        done,
        percent,
    });
    newTask.save()
    .catch(err => res.status(400).json('Error: '+err));

    console.log("in tasks",myobj);
  
  });


  tasksRoutes.post('/remove',async (req,res)=>{ // When a user creates a task, its saved into the database

    console.log("REMOVING FROM DB IN ROUTES");
    let db_connect = dbo.getDb();
    let myobj = {
        id: req.body.form.id,
        date:req.body.form.date,
    };
    
    const username = req.body.form.username;
    const id = req.body.form.id;
    const date = req.body.form.date;
    const priority = req.body.form.priority;
    const title = req.body.form.title;
    const description = req.body.form.description;
    const done = req.body.form.done;
    const percent = req.body.form.percent;

    console.log(username);
    
    

    const removeForm = async (formFields) => {
      try {
        await Task.deleteOne(formFields);
        console.log('Form deleted successfully');
      } catch (err) {
        console.error('Error deleting form:', err);
      }
    };
    
    removeForm({
      username: username,
      id: id,
      date: date,
      priority: priority,
      title: title,
      description: description,
      done: done,
      percent: percent,
    });
    

    console.log("in tasks",myobj);
  
  });


tasksRoutes.post('/retrieve',async (req,res)=>{ //When a user logs in, it retrieves all the tasks from the database

    const username = req.body.userInfoOut.user.username;

    try{
        const tasks = await Task.find({ username: username });
        if (!tasks) {
            // No user found
            return res.status(404).json({ message: 'No tasks for this user' });
          }

        res.status(200).json(tasks);

    } catch(error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }


  })

module.exports = tasksRoutes;
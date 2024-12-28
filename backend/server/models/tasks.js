const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    id:{ type:Number, required:true} ,
    date:{ type:String,required:true},
    priority:{ type:String,required:true},
    title:{ type:String,required:true},
    description:{ type:String,required:true},
    done:{ type:Boolean,required:true},
    percent:{type:Number,required:true},

});

const Task = mongoose.model('Task',userSchema);

module.exports = Task;
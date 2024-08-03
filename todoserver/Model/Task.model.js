const mongoose = require('mongoose');

const taskschema = mongoose.Schema({
    title:{
        type:String,
        required:[true,'Title is required.']
    },
    description:{
        type:String,
    },
    duedate:{
        type:Date,
        required:[true,'Due date is required.']
    },
    status:{
        type:String,
        default:"todo"
    }
},{timestamps:true});

const Task = mongoose.model('Task',taskschema);

module.exports=Task;
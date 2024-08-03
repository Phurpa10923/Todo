const express = require('express');
const app = express();
app.use(express.json());
const Task = require('./Model/Task.model');
const port = 5000;
const mongoose = require('mongoose');
const moment =require('moment');

app.get('/tasks/:status?',async (req,res)=>{
    try{
        const {status} = req.params;
        const titlename =req.query.name||''; 
        const dateFlag = req.query.day || '';
        const date = moment(new Date()).format('YYYY-MM-DD');
        let query = status ? {"status":status} :{};
        if(titlename){
            query={...query,"title":{$regex:titlename,$options:'i'}}
        }
        if(dateFlag){
            query=dateFlag=='today'?{...query,'duedate':date}:{...query,'duedate':{$gt:date}};
        }
        const tasks = await Task.find(query).sort({ duedate: 1 });;
        if(!tasks){
            res.json([]);
        }
        res.json(tasks);
    }catch(e){
        console.log(e)
    }
})

app.post('/newtask',async (req,res)=>{
    try{
        const task = await Task.create(req.body);
        res.status(200).json(task);
    }catch(e){
        res.status(500).json({message:e});
    }
});

app.patch('/updatetask/:id',async (req,res)=>{
    try{
        const {id} = req.params;
        const updatedObj = req.body.data;
        console.log(updatedObj)
        const updatedTask = await Task.findByIdAndUpdate(id,updatedObj);
        if(!updatedTask){
            res.json({message:'No record',success:false});
        }
        res.json(updatedTask);
    }catch(e){
        res.status(500).json({message:e});
    }
})

app.delete('/removeTask/:id',async (req,res)=>{
    try{
        const {id} =req.params;
        const tasks = await Task.findByIdAndDelete(id);
        res.json(tasks);
    }catch(e){
        console.log(e)
    }
})
app.listen(port,()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/tasks?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.15').then(()=>{
        console.log('connection made');
    }).catch((err)=>{
        console.log(err);
    })
    console.log('Listening to port 5000');
})
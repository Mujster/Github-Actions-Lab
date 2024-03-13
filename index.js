const express = require('express');
const app=express();

const Task=[{
    taskId:1,
    taskTitle:"Yolo",
    taskDescription:"jojwewem",
    dueDate:"21-01-2024",
    priority:'High',
    Category:"Personal",
    completed:true,
    userId:1
}]

const User=[{
    userId:1,
    userName:"Mujtaba",
    userPass:"1234",
}]

app.put('/addpriority/:taskid',async(req,res)=>{
    try{
       const id=req.params.taskid;
       const priority=req.body;
       if(!id){
         return res.status(400).json("no input");
       }
       const task = Task.find(t => t.taskId == id);
        if (task) {
            task.priority = priority;
            res.json(task);
        } else {
            res.status(404).json("Task not found");
        } 
    }
    catch(err){
      console.log(err);
    }
 });
 
 app.get('/viewtasks/:userid',async(req,res)=>{
     try{
         const id=req.params.userid;
         if(!uid){
             return res.status(400).json("No User found");
         }
         const tasks = Task.filter(t => t.userId == id);
         if (tasks.length!==0) {
             res.json(tasks);
         } else {
             res.status(404).json("No tasks found");
         }
     }
     catch(err){
         console.log(err);
     }
 }); 

app.post('/register',async(req,res)=>{
    try{
        const {user}=req.body;
        if(!user){
            return res.status(400).json("No Input");
        }
        let newUser={
            userId:user.id,
            userName:user.name,
            userPass:user.pass
        }
        await User.push(newUser);
    }
    catch(err){
        console.log(err);
    }
});

app.post('/login',async(req,res)=>{
    try{
        const {user}=req.body;
        if(!user){
            return res.status(400).json("No Input");
        }
        const users = await User.find(u => u.userName === userName);
        if (user.userPass !== userPass) {
            return res.status(401).json("Invalid password");
        }
        res.status(200).json("Login successful");
    }
    catch(err){
        console.log(err);
    }
});

app.post('/addTask',async(req,res)=>{
    try{
        const {task}=req.body;
        if(!task){
            return res.status(400).json("No Input");
        } 
        let newTask={
            taskId:task.id,
            taskTitle:task.title,
            taskDescription:task.description,
            dueDate:task.duedate,
            priority:task.priority,
            Category:task.category,
            completed:task.completed,
            userId:task.userid,
        }
        await Task.push(newTask);
    }
    catch(err){
        console.log(err);
    }
});

app.put('/status/:taskId',async(req,res)=>{
   try{
      const id=req.params.taskId;
      const task = Task.find(t => t.taskId === parseInt(req.params.taskId));
      if (!task) {
          return res.status(404).json("Task not found");
      }
      task.completed = completed;
      res.status(200).json("Task status updated");
   }
   catch(err){
    console.log(err);
   }
});

app.listen(3000,()=>{console.log("Server Listening...")});
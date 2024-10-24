const express = require('express');
const app = express();
const {connectDB} = require('./config/database');
const User = require('./model/user');
const bcrypt = require('bcrypt');
const { validateSignUpData } = require('./utils/validate');
const validator = require('validator');

app.use(express.json());

app.post('/signup',async (req,res)=>{
    try{
        const {firstName,lastName,email,password}=req.body;
        validateSignUpData(req);
        const hashPassword = await bcrypt.hash(password,10);
        const user = new User({
            firstName,
            lastName,
            email,
            password:hashPassword
        });
        await user.save();
        res.send("User saved successfully")
    }catch(err){
        res.status(500).send("ERROR : " + err.message);
    }
});

app.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!validator.isEmail(email)){
            throw new Error("Email id is not valid");
        }
        const user = await User.findOne({email});
        if(!user){
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            throw new Error("Invalid Credential");
        }
        res.send("Login successfull");
    }catch(err){
        res.status(500).send("ERROR :  " + err.message);
    }
})

app.get('/user',async(req,res)=>{
    const userEmail = req.body.email
    try{
        const users = await User.findOne({email:userEmail});
        if(users){
            res.send(users);
        }else{
            res.status(404).send("No users found");
        }
    }catch(err){
        res.status(400).send("Something went wrong")
    }
})

app.get('/feed',async(req,res)=>{
    try{
        const users = await User.find({});
        if(users.length !== 0){
            res.send(users);
        }else{
            res.send("No users found");
        }
    }catch(err){
        res.status(400).send("Something went wrong")
    }
})

app.delete('/user',async(req,res)=>{
    const userId= req.body.userId;
    try{
        await User.findByIdAndDelete(userId);
        res.send("user deleted successfully");
    }catch(err){
        res.status(400).send('something went wrtong')
    }
});

app.patch('/user/:userId',async(req,res)=>{
    const userId= req.params?.userId;
    const data = req.body;
    try{
        const allowedUpdates = ["gender","age","skills","photoUrl"];
        const isUpdatedAllowed = Object.keys(data).every(k=>allowedUpdates.includes(k));
        if(!isUpdatedAllowed){
            throw new Error("Update not allowed")
        }
        if(data.skills?.length > 10){
            throw new Error("Skill size overloaded")
        }
        const user = await User.findByIdAndUpdate(userId,data,{returnDocument:"after",runValidators:true});
        res.send("user updated successfully");
    }catch(err){
        res.status(400).send('UPDATE FAILED '+ err.message)
    }
})

connectDB().then(()=>{
    console.log("Database connection established");
    app.listen(7777,()=>{
        console.log("Server started at port 7777");
    })
}).catch((err)=>{
    console.log("Database not connected");
})

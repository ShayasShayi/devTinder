const express = require('express');
const app = express();

app.use('/home',(req,res)=>{
    console.log("dashboard pasge");
    res.send("dashboard pasge")
})

app.use('/',(req,res)=>{
    console.log("Hello developer");
    res.send("Hello developer")
})


app.listen(7777,()=>{
    console.log("Server started at port 7777");
})
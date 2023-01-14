const express = require('express');
const app = express();

app.listen(2000,()=>{
    console.log("server is running");
})

app.get('/',(req,res)=>{
    res.json({message: "wellcome to my node js api"})
})
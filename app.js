const express = require('express');
const app = express();
require('dotenv').config();
let port = process.env.PORT;
app.listen(port,()=>{
    console.log(`server is running on ${port} `);
})

app.get('/',(req,res)=>{
    res.json({message: "wellcome to my node js api"})
})
app.get('/food',(req,res)=>{
    res.json({foods : "pizza,hamburger"})
})
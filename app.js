require('dotenv').config();
const express = require('express');
const app = express();
const { urlencoded } = require('express');
const apiRouter = require('./routes/api');
const mongoose = require('mongoose');
const dbURL = 'mongodb+srv://yaewint:yewintaung@nodejsapi.usregc0.mongodb.net/signup?retryWrites=true&w=majority';

mongoose.connect(dbURL,{useNewUrlParser : true , useUnifiedTopology : true })
        .then((result)=>{
            app.listen(port,()=>{
                console.log(`server is running on ${port} `);
            })
        })
        .catch((err)=>{
            console.log(err);
        })

let port = process.env.PORT;

app.use(express.urlencoded());
app.use('/api',apiRouter);
app.get('/',(req,res)=>{
    res.json({message: "wellcome to my node js api"})
})
app.get('/food',(req,res)=>{
    res.json({foods : "pizza,hamburger"})
})
app.use((req,res)=>{
    res.status(404).render('404');
});
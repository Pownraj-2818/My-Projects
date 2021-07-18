require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const body = require('body-parser')
const cors= require('cors')
const dbConfig=require('./config/config')
const app =express()

app.use(body.urlencoded({extended:true}))
app.use(body.json())
app.use(cors());

mongoose.Promise= global.Promise

mongoose.connect(dbConfig.url,{useUnifiedTopology:true,useNewUrlParser:true})
.then(()=>{
    console.log("You are connected Successfully")
}).catch((error)=>{
    console.log(error)
    process.exit()
});

require('./route')(app)

app.listen(8000,()=>{
    console.log("Server is listening at port 8000")
})
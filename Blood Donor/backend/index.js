require('dotenv').config()
const express = require ('express')
const mongoose=require('mongoose')
const body=require('body-parser')

var cors = require("cors");
const config=require('./config/config')
const app= express();

app.use(body.urlencoded({ extended: true }))
app.use(body.json())
// app.use(passport.initialize())
app.use(cors());




mongoose.Promise = global.Promise

mongoose.connect(config.url, { useUnifiedTopology: true , useNewUrlParser: true })
    .then(() => {
        console.log("Successfully connected to the database");    
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });


   



require('./routes/routes')(app)
    
app.listen(8000,()=>{
    console.log("Successfuly running at port 8000")
})
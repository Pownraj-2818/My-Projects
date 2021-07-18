const mongoose = require('mongoose')

const userSchema= new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    e_mail:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true,
       
    },
    state:{
        type:String,
        required:true
    },
    phone_number:{
        type:Number,
        required:true
    },
    availability:{
        type:String,
        required:true
    },
    blood_group:{
        type:String,
        required:true
    }

   
})

module.exports=mongoose.model('user',userSchema)
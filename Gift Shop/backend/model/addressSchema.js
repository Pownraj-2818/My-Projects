const mongoose = require('mongoose')
const User= require('./userSchema')


const addressSchema = new mongoose.Schema({
   
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    name:{
        type:String,
        required:true
    },
    door_no:{
        type:String,
        required:true
    },
    street:{
        type:String,
        required:true
    },
    locality:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    addresstype:{
        type:String,
        required:true
    },
    phone_no:{
        type:Number,
        required:true
    }
    

})

module.exports=mongoose.model('address',addressSchema)
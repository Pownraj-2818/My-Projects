const mongoose = require('mongoose')

const gallerySchema= new mongoose.Schema({
    imgURL:{
        required:true,
        type:String
    },
    imgName:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('gallery',gallerySchema)
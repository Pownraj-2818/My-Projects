const mongoose = require('mongoose')

const Slickschema= new mongoose.Schema({
    imgURL:{
        required:true,
        type:String
    },
    imgName:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('Slick',Slickschema)
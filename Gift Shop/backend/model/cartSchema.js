const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      },
     qty:{
         type:Number,
         required:true
     },
     price:{
         type:Number,
         required:true
     },
     product:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'allProducts'
     }
})

module.exports=mongoose.model('cartData',cartSchema)
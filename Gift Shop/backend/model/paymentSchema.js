const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      },
      address:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address'  
      },
     mode:{
        type:String,
        required:true
     },
     product:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'allProducts'
     }
})

module.exports=mongoose.model('payment',paymentSchema)
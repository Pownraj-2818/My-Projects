const Address=require('../model/addressSchema')
const User = require('../model/userSchema')

exports.addAddress=(req,res)=>{
    User.findOne({_id:req.body.user})
    .then((users)=>{
        var record= {
            name:req.body.name,
            door_no:req.body.door_no,
            street:req.body.street,
            district:req.body.district,
            state:req.body.state,
            pincode:req.body.pincode,
            locality:req.body.locality,
            addresstype:req.body.addresstype,
            phone_no:req.body.phone_no,
            user:users._id
        }
        console.log("Record "+record.name)
        console.log(record)
        Address.create({ user:record.user,name:record.name, door_no:record.door_no,street:record.street,locality:record.locality,district:record.district,state:record.state,pincode:record.pincode,addresstype:record.addresstype,phone_no:req.body.phone_no})
        .then((data)=>{
            console.log("Data "+data)
            res.send(data)
           
        }).catch(error=>{
            res.send(error)
        })
    }).catch(error=>{
        res.send(error)
    })
}

exports.get=(req,res)=>{
    Address.find({user:req.body.userID})
    .then((data)=>{
        
        res.send(data)
       
    }).catch(error=>{
        res.send(error)
    })
}

exports.getOne=(req,res)=>{
    Address.findOne({_id:req.body.id})
    .then((data)=>{
        console.log(data)
        res.send(data)
       
    }).catch(error=>{
        res.send(error)
    })
}

exports.delete=(req,res)=>{
    Address.remove({_id:req.body.id})
    .then((data)=>{
        console.log(data)
        res.send(data)
        
       
    }).catch(error=>{
        res.send(error)
    })
}

exports.update=(req,res)=>{

    var data=req.body.data
  
    Address.findOne({_id:data.id})
    .then((value)=>{
       
     const addressData={
         name:data.name,
         door_no:data.door_no,
         street:data.street,
         locality:data.locality,
         district:data.district,
         state:data.state,
         pincode:data.pincode,
         addresstype:data.addresstype,
         phone_no:data.phone_no
      }
  
      Address.updateOne({_id:data.id},{$set:addressData})
      .then((value)=>{
          res.send(value)
      }).catch((err)=>{
          console.log(err)
      })
      
    }).catch((err)=>{
        console.log(err)
    })
}




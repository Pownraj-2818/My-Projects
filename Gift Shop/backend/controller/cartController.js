//  const User = require('../model/UserSchema')
const Cart = require('../model/cartSchema')
const Product = require('../model/allProducts')

exports.addCart =(req,res)=>{
    console.log(req.body)
    Product.findOne({_id:req.body._id})
     .then( (data)=>{
         console.log(data)
           Cart.findOne({product:data.id,user:req.body.id})
            .then( (cart)=>{
                if(cart){}
                else{
                   new Cart({
                        user:req.body.id,
                        product:data.id,
                        price:data.price,
                        qty:1
                    }).save()
                    .then(cards=>{
                        console.log(cards)
                    }).catch((err)=>{
                        console.log(err)
                    })
                }
            })
         })
    
 }

 exports.get=(req,res)=>{
    Cart.find({})
    .then((data)=>{
        res.send(data)
    }).catch(error=>{
        res.send(error)
    })

}

exports.getoneUser= (req,res)=>{
    console.log(req.body.user)
  Cart.find({user:req.body.user}).limit(1)
    .populate('product')
    .populate('user')
    .then((cartData)=>{
        // console.log(req.body.userID)
        res.send(cartData)
    }).catch((err)=>{
        console.log(err)
    })  
}

exports.updateCart=(req,res)=>{
    console.log(req.body.qty)
    console.log(req.body.totalProductPrice)
    console.log(req.body.id)
     Cart.findOneAndUpdate({_id:req.body.id},{$set:{price:req.body.totalProductPrice,qty:req.body.qty}})
    .then((cart)=>{
        console.log(cart)
        res.send(cart)
    }).catch((err)=>{
        console.log(err)
    })
   
}

exports.deleteCart=(req,res)=>{
    console.log(req.body.id)
    Cart.remove({_id:req.body.id})
    .then((cartData)=>{
       
        res.send(cartData)
    }).catch((err)=>{
        console.log(err)
    })  
}

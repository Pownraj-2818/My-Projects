const Product=require('../model/allProducts')

exports.add=(req,res)=>{
    Product.create({
        imgURL:req.body.imgURL,
        code:req.body.code,
        productName:req.body.productName,
        desc:req.body.desc,
        key1:req.body.key1,
        key2:req.body.key2,
        offer:req.body.offer,
        price:req.body.price,
        stars:req.body.stars,
        ratings:req.body.ratings,
        by:req.body.by
    })
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
}

exports.get=(req,res)=>{
    Product.find({})
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
}

exports.getone=(req,res)=>{
    let productId=req.params.id
    Product.find({_id:productId})
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
}

exports.update=(req,res)=>{
    Product.findOneAndUpdate({_id:req.params.id},{$set:{imgURL:req.body.imgURL}})
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
}
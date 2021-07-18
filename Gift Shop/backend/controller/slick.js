const Slick=require('../model/SlickSchema')

exports.add=(req,res)=>{
    Slick.create({imgURL:req.body.imgURL,imgName:req.body.imgName})
    .then((data)=>{
        console.log(data)
    }).catch((err)=>{
        console.log(err)
    })
}

exports.get=(req,res)=>{
    Slick.find({})
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
}



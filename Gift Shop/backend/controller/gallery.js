const Gallery=require('../model/gallerySchema')

exports.add=(req,res)=>{
    Gallery.create({imgURL:req.body.imgURL,imgName:req.body.imgName})
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
}

exports.get=(req,res)=>{
    Gallery.find({})
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
}



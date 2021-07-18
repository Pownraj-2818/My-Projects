const User = require('../model/userSchema')
const hash=require('./bcrypt')

exports.Signup= async (req,res)=>{
console.log(req.body)
    // res.redirect('/register')
   
        try {
                const hashPassword = await hash.cryptpassword(req.body.password)
                console.log(hashPassword)
                User.create({fullname:req.body.fullname,e_mail:req.body.e_mail,password:hashPassword,phone_no:req.body.phone_no})
                .then(data => {
                    console.log(data)
                    res.send("Registered successfully " +data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the User."
                    });
                }); 
           
            
        } catch (error) {
           res.send(error) 
        }
        
    
    
}

exports.getUsers = (req,res)=>{
    User.find({})
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
}

exports.getUser=(req,res)=>{
    console.log(req.body.id)
    User.findOne({_id:req.body.id})
    .then(data => {
        console.log(data)
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
}

// exports.updateuser=(req,res)=>{
// var newdata=new User({
//        fullname:req.body.data.fullname,
//        phone_no:req.body.data.phone_no,
//        e_mail:req.body.data.e_mail
//    })

//     User.findOne({_id:req.body.id} )
//     .then((value) => {
//         console.log(value)
//         User.updateOne({_id:req.body.id},{$set:req.body.data})
//         .then((record)=>{
//             res.send(record)
//             console.log(record)
//         })
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while creating the User."
//         });
//     });
// }

exports.login=async(req,res)=>{
    try {
        await User.findOne({e_mail:req.body.e_mail},async function(err,exists){
            if (exists){
                const check =  await hash.validate(req.body.password,exists.password)
                if (check){
                    const payload = {
                        id:exists._id,
                        fullname:exists.fullname,
                        e_mail:exists.e_mail,
                    }
                   // console.log(payload)
                   const token = await hash.generator(payload)
                //    res.cookie('jwtToken',token,{httpOnly:true})
                   //res.send(token)
                   res.send(token)
                   console.log(token)
                
                }else{
                    res.send("Password Incorrect")
                }
                
            }else{
                res.send("Username not found")
            }   
        })
    } catch (error) {
        res.send(error)
    }
}
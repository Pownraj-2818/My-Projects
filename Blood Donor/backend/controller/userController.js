const User = require('../model/userSchema')
const hash=require('../controller/bcrypt')
exports.Signup= async (req,res)=>{
console.log(req.body)
    // res.redirect('/register')
   
        try {
                const hashPassword = await hash.cryptpassword(req.body.password)
                console.log(hashPassword)
                User.create({fullname:req.body.fullname,blood_group:req.body.blood_group,e_mail:req.body.e_mail,password:hashPassword,city:req.body.city,district:req.body.district
                ,state:req.body.state,phone_number:req.body.phone_number,country:req.body.country,availability:req.body.availability
                })
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
                   res.send({
                       bearertoken:token
                   })
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

exports.filters=(req,res)=>{
    var city=req.body.city
    var state = req.body.state
    var blood_group= req.body.blood_group
    var country=req.body.country
    var district=req.body.district

    User.find({city:city,state:state,blood_group:blood_group,country:country,district:district},function(err,data){
        if(err){
            console.log(err)
        }else{
           console.log(data)
           res.send(data)
        }
    })
    
}
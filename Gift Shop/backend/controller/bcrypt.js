const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const difficultylevel = 10;

const cryptpassword = async (password)=>{
        const salt = await  bcrypt.genSalt(difficultylevel)
        const hash = await bcrypt.hash(password,salt)
        return hash  
}

exports.validate=async(password,hashedpassword)=>{
    try {
        const result=await bcrypt.compare(password,hashedpassword)
        return result 
    } catch (error) {
       return false 
    }
    

}

exports.generator=(user)=>{
    const token = jwt.sign({user},process.env.secretKey)
    return token
}

exports.validatetoken=(token)=>{
    try {
        const value=jwt.verify(token,process.env.secretKey);
        // console.log(value)
        return value 
    } catch (error) {
        return false;
    }
    
}

module.exports.cryptpassword = cryptpassword
const jwt = require("jsonwebtoken")
const Auth = require("../Models/authModel")


const validateRegistration = async (req, res, next)=>{

    const {email, password, firstName, lastName, state } = req.body

   const errors = []

    if(!email){
       errors.push("Please provide your email")
        }

        if(!password){
          errors.push("Please provide your password")
        }

           if(password.length < 8 ){
             errors.push("require mininmum of 8 characters")
        }

        if( errors.length > 0){
            return res.status(401).json({message: errors})
        }

        next()


}




const auth = async (req, res, next)=>{
    const token = req.header("authorization")

    if(!token){
        return res.status(401).json({message: "please login"})
    }
    
    const splitToken = token.split(" ")

    const realToken = splitToken[1]

    const decoded = jwt.verify(realToken, process.env.ACCESS_TOKEN)

    if(!decoded){
         return res.status(401).json({message: "Incorrect login details"})
    }

    const user = await Auth.findById(decoded.id)

    if(!user){
        return res.status(404).json({message: "User account not found"})
    }

    // if(user?.role !== "admin"){
    //     return res.status(401).json({message: "Invalid authorization"})
    // }

    req.user = user

    next()

}

module.exports = {
    validateRegistration,
    auth

}
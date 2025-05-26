const Auth = require("../Models/authModel")
const { findUsers } = require("../Service")


const handleAllUsers = async (req, res)=>{

    console.log(req.user)

  const allusers = await findUsers()

    return res.status(200).json({message: "successful",
        users: allusers
     })

    }

     const handleUserRegistration = async (req, res)=>{

    try {

         const { email, password, firstName, lastName, state } = req.body

          


        const existingUser = await Auth.findOne({ email })

        if(existingUser){
            return res.status(400).json({message: "User account already exist"})
        }


        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = new Auth({email,
            password: hashedPassword, firstName, lastName, state})

        await newUser.save()
        
        return res.status(200).json({message: "User account created successfully",
            newUser: {email, firstName, lastName, state}
        })
        
    } catch (error) {
         return res.status(500).json({message: error.message})
    }


}

const handleLogin = async (req, res)=>{
    
    try {
        
        const { email, password} = req.body

         if(!email){
             return res.status(400).json({message:"Please provide your email"})
         }

          if(!password){
                 return res.status(400).json({message:"Please provide your password "})
            }

        const user = await Auth.findOne({ email })

          if(!user){
              return res.status(400).json({message:"User account not found"})
        }

        const isMatch = await bcrypt.compare(password, user?.password)

        if(!isMatch){
                return res.status(400).json({message: "Incorrect email or password"})
        }

        // Generate token

        const accessToken = jwt.sign({id: user?._id}, process.env.ACCESS_TOKEN, {expireIn: "5m"} )


        // REfresh Token
        const refreshToken = jwt.sign({id: user?._id}, process.env.REFRESH_TOKEN, {expiresIn: "30d"})



        return res.status(200).json({message: "Login succesfully",
            accessToken,
            user: {
                email: user?.email,
                email: user?.email,
                firstName: user?.firstName,
                lastName: user?.lastName,
                state: user?.state
            },
            refreshToken

        })

        
    } catch (error) {
        
         return res.status(500).json({message: error.message})

    }
}

const handleForgotPassword = async (req, res)=>{

  try {
    
      const { email } = req.body

    if(!email){
        return res.status(400).json({message: "Please enter your email"})
    }

    const user = await Auth.findOne({ email })

    if(!user){
        return res.status(404).json({message: "User account not found"})
    }

    const accessToken = await jwt.sign({user}, process.env.ACCESS_TOKEN, {expiresIn: "5m"})

    // send the user an email with token

await sendForgetPasswordEmail( email, accessToken)
    // 

    return res.status(200).json({message: "Please check your email inbox"})

  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

const handleResetPassword =  async (req, res)=>{
    
    try {
        
        const { password } = req.body

        const user = await findOne({ email: req.user.email })

        if(!user){
            return res.status(404).json({messasge: "User account not found"})

        const hashedPassword = await bcrypt.hash(password, 12)
        }

        user.password = hashedPassword

        await user.save()

        return res.status(200).json({message: "Password reset successfully"})



    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const welcome = (req, res)=>{
    console.log("Welcome to my world of Tech")
}
     



module.exports = {
    handleAllUsers,
    handleUserRegistration,
    handleLogin,
    handleForgotPassword,
    handleResetPassword,
    welcome
}
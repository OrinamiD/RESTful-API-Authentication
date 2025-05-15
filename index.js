

const express = require("express")

const mongoose = require("mongoose")

const jwt = require("jsonwebtoken")

const dotenv = require("dotenv")
dotenv.config()

const bcrypt = require("bcryptjs")
const Auth = require("./Models/authModel")
// const validateSignUp = require("./middleWares/validate")
// const validateLogin = require("./middleWares/validate")


const app = express()

app.use(express.json())

const PORT = process.env.PORT || 6000


mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("MongoDB connected successfully...")

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
})


app.get("/", (req, res)=>{
    console.log("Welcome to my world of Tech")
} )

// registration

app.post("/sign-up", async (req, res)=>{

    try {

         const { email, password, firstName, lastName, state } = req.body

          if(!email){
       return res.status(400).json({message:"Please provide your email"})
        }

        if(!password){
          return res.status(400).json({message:"Please provide your password "})
        }

           if(password.length < 8 ){
             return res.status(400).json({message:"require mininmum of 8 characters "}) 
        }



        const existingUser = await Auth.findOne({ email })

        if(existingUser){
            return res.status(400).json({message: "User account already exist"})
        }


        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = new Auth({email,
            password: hashedPassword,
            firstName,
            lastName,
            state})

        // await newUser.save()
        
        return res.status(200).json({message: "User account created successfully",
            newUser: {email, firstName, lastName, state}
        })
        
    } catch (error) {
         return res.status(500).json({message: error.message})
    }


})


// login

app.post("/login", async (req, res)=>{
    
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
})


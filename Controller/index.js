const Auth = require("../Models/authModel")
const { findUsers } = require("../Service")


const handleAllUsers = async (req, res)=>{

  const allusers = await findUsers()

    return res.status(200).json({message: "successful",
        users: allusers
     })

    }

     const handleUserRegistration = async (req, res)=>{
        async (req, res)=>{

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
     }



module.exports = {
     handleAllUsers,
     handleUserRegistration
}
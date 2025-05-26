

const express = require("express")

const mongoose = require("mongoose")

const jwt = require("jsonwebtoken")

const dotenv = require("dotenv").config()
                                                                               

const bcrypt = require("bcryptjs")
const Auth = require("./Models/authModel")
const cors = require("cors")
const routes = require("./Route")


const app = express()

app.use(express.json())

app.use(cors());

const PORT = process.env.PORT || 6000


mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("MongoDB connected successfully...")

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
})


app.use(routes)

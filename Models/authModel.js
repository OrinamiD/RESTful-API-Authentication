

const mongoose = require("mongoose")

const authSchema = new mongoose.Schema({
    email: {type: String},
    password: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    state: {type: String}

}, {timestamps: true})


const Auth = new mongoose.model("Auth", authSchema)

module.exports = Auth
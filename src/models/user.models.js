const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName : String,
    email : String,
    password : String,
    refreshToken : String,

},{timestamps :true})

const User = mongoose.model("User",userSchema)

module.exports = {User}
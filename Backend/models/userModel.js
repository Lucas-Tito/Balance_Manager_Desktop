const mongoose = require("mongoose")

const {Schema} = mongoose

const userSchema = new Schema({
    email: String,
    nome: String,
    senha: String
}, {timestamps:true})
//timestamps saves the date that the object was created or updated

const userModel = mongoose.model("userModel", userSchema)
module.exports = {
    userModel
}
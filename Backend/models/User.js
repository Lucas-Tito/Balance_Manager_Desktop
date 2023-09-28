const mongoose = require("mongoose")

const {Schema} = mongoose

const userSchema = new Schema({
    id: String,
    email: String,
    nome: String,
    senha: String
}, {timestamps:true})
//timestamps saves the date that the object was created or updated

const User = mongoose.model("User", userSchema)
module.exports = {
    User
}
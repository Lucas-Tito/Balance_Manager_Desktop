const mongoose = require("mongoose")

const {Schema} = mongoose

const userSchema = new Schema({
    email: String,
    name: String,
    password: String,
    custom_categories: { type: Array, default: ["contas", "venda", "estoque", "outros"] }
}, {timestamps:true})
//timestamps saves the date that the object was created or updated

const userModel = mongoose.model("userModel", userSchema)
module.exports = {
    userModel
}
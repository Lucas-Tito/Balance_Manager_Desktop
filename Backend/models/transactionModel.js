const mongoose = require("mongoose")

const {Schema} = mongoose

const transactionSchema = new Schema({
    description: String,
    value: Number,
    type: String,
    category: String,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel"
    }
}, {timestamps:true})
//timestamps saves the date that the object was created or updated

const transactionModel = mongoose.model("transactionModel", transactionSchema)
module.exports = {
    transactionModel
}
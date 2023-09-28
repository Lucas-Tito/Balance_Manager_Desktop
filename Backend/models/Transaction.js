const mongoose = require("mongoose")

const {Schema} = mongoose

const transactionSchema = new Schema({
    id: String,
    description: String,
    value: Number,
    type: String,
    categoria: String
}, {timestamps:true})
//timestamps saves the date that the object was created or updated

const Transaction = mongoose.model("Transaction", transactionSchema)
module.exports = {
    Transaction
}
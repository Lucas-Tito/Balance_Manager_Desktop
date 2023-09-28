//import
const mongoose = require("mongoose")

async function main() {
    try {
        
        await mongoose.connect("mongodb+srv://lucastito:12345678l@cluster0.hrwdkp8.mongodb.net/")
        console.log("connected to db");
    } catch (error) {
        console.log(`error: ${error}`);
    }
}

module.exports = main
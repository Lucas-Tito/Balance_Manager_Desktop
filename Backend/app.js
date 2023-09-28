//imports
const express = require("express")
const cors = require("cors") //helps when using frontend and backend at the same machine
const app = express()

app.use(cors())
app.use(express.json()) //allows json usage

app.listen(3000, function(){
    console.log("Bravo 6, going dark!")
})
//imports
const express = require("express")
const cors = require("cors") //helps when using frontend and backend at the same machine
const app = express()

app.use(cors())
app.use(express.json()) //allows json usage

//DB Connection
const conn = require("./db/conn")
conn()

//Routes
const routes = require("./routes/router")
//all routes from this api are from routes
app.use("/api", routes)

app.listen(3000, function(){
    console.log("Bravo 6, going dark!")
})
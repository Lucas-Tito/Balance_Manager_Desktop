//centralizer file for others routes
//you only need to import this file in the app.js, instead of importing all routes

const router = require("express").Router()

//Transaction router
const transactionRouter = require("./transactions")

router.use("/", transactionRouter)

module.exports = router;
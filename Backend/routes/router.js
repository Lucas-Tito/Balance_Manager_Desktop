//centralizer file for others routes
//you only need to import this file in the app.js, instead of importing all routes

const router = require("express").Router()

//routers
const transactionRouter = require("./transactionsRouter")
const userRouter = require("./userRouter")

router.use("/", transactionRouter)
router.use("/", userRouter)

module.exports = router;
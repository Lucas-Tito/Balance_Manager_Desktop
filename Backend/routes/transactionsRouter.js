//defining routes
const router = require("express").Router()

const transactionController = require("../controllers/transactionController")

router.route("/transactions").post((req, res) =>transactionController.create(req, res))

router.route("/transactions/user/:user").get((req, res) => transactionController.getAll(req, res))

router.route("/transactions/:id").get((req, res)=> transactionController.get(req,res))

router.route("/transactions/:id").delete((req, res)=> transactionController.delete(req,res))

router.route("/transactions/:id").put((req, res)=> transactionController.update(req,res))

router.route("/transactions/searchbyDesc/:user").get((req, res)=> transactionController.searchByDescription(req,res))

module.exports = router
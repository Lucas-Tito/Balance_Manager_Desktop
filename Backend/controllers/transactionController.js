const { Transaction: TransactionModel } = require("../models/Transaction")

const transactionController = {

    create: async(req, res) => {
        try {
            const transaction = {
                id: req.body.id,
                description: req.body.description,
                value: req.body.value,
                type: req.body.type,
                categoria: req.body.categoria
            }
            
            const response = await TransactionModel.create(transaction)

            res.status(201).json({response, msg:"Transação created successfully"})

        } catch (error) {
            console.log(`error: ${error}`);
        }
    },

    get: async(req, res)=>{
        try {
            const id = req.params.id
            const transaction = await TransactionModel.findById(id)

            if(transaction==null){
                res.status(404).json({msg:"transaction not found"})
                return
            }

            res.json(transaction)

        } catch (error) {
            console.log(`error: ${error}`);
        }
    },

    getAll: async(req, res) =>{

        try {
            const transaction = await TransactionModel.find() 

            res.json(transaction)

        } catch (error) {
            console.log(`error: ${error}`);
        }
    }

}

module.exports = transactionController
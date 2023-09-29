const { transactionModel: TransactionModel } = require("../models/transactionModel")

const transactionController = {

    create: async(req, res) => {
        try {
            const transaction = {
                description: req.body.description,
                value: req.body.value,
                type: req.body.type,
                categoria: req.body.categoria
            }
            
            const response = await TransactionModel.create(transaction)

            res.status(201).json({response, msg:"transaction created successfully"})

        } catch (error) {
            console.log(`error: ${error}`);
        }
    },




    delete: async(req, res)=>{
        try {
            const id = req.params.id
            const transaction = await TransactionModel.findById(id)

            //checks if id is null
            if (!transaction) {
                res.status(404).json({ msg: "transaction not found" })
                return
            }   

            const deletedTransaction = await TransactionModel.findOneAndDelete(id)
            res.status(200).json({deletedTransaction, msg: "transcation deleted successfully"})
        } catch (error) {
            console.log(`error: ${error}`);
        }
    },





    update: async(req, res)=>{
        try {
        const id = req.params.id

        const transaction = {
            description: req.body.description,
            value: req.body.value,
            type: req.body.type,
            categoria: req.body.categoria
        }
        const updatedTransaction = await TransactionModel.findByIdAndUpdate(id, transaction)

        //checks if id is null
        if (!updatedTransaction) {
            res.status(404).json({ msg: "transaction not found" })
            return
        }   
        
        res.status(200).json({updatedTransaction, msg: "transcation updated successfully"})

        } catch (error) {
            console.log(`error: ${error}`);
        }
    },




    get: async(req, res)=>{
        try {
            const id = req.params.id
            const transaction = await TransactionModel.findById(id)

            //checks if id is null
            if (!transaction) {
                res.status(404).json({ msg: "transaction not found" })
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
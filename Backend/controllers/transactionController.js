const { transactionModel: TransactionModel } = require("../models/transactionModel")
const mongoose = require("mongoose")

const transactionController = {

    create: async(req, res) => {
        try {
            const transaction = {
                description: req.body.description,
                value: req.body.value,
                type: req.body.type,
                category: req.body.category,
                user: new mongoose.Types.ObjectId(req.body.user)
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

            const deletedTransaction = await TransactionModel.findByIdAndDelete(id)
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
            category: req.body.category
        }
        const updatedTransaction = await TransactionModel.findByIdAndUpdate(id, transaction)

        //checks if id is null
        if (!updatedTransaction) {
            res.status(404).json({ msg: "transaction not found" })
            return
        }   
        
        res.status(200).json({updatedTransaction, msg: "transcation updated successfully"})
        console.log("hi");
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
            const user = req.params.user
            const transactions = await TransactionModel.find({user:user})

            res.json(transactions)

        } catch (error) {
            console.log(`error: ${error}`);
        }
    },


    searchByDescription: async(req, res)=>{
        try {
            const userToSearch = req.params.user
            const descriptionToSearch = req.query.desc
            //regex is used to achieve the result of an LIKE operator
            const transaction = await TransactionModel.find({description: {$regex: descriptionToSearch}, user:userToSearch})

            //checks if id is null
            if (!transaction) {
                res.status(404).json({ msg: "didn't found any transactions" })
                return
            }   

            res.json(transaction)
        } catch (error) {
            console.log(`error: ${error}`);
        }
    },

    searchByCategory: async(req, res)=>{
        try {
            const userToSearch = req.params.user
            const categoryToSearch = req.query.cate
            //regex is used to achieve the result of an LIKE operator
            const transaction = await TransactionModel.find({category: {$regex: categoryToSearch}, user:userToSearch})

            //checks if id is null
            if (!transaction) {
                res.status(404).json({ msg: "didn't found any transactions" })
                return
            }   

            res.json(transaction)
        } catch (error) {
            console.log(`error: ${error}`);
        }
    },

    searchByMonth: async(req, res)=>{
        try {
            const userToSearch = req.params.user
            //gets month and year from query in the format (Y-M)
            const monthNYearToSearch = req.query.monthYear

            //search for a transction that has a date on the specified month and year
            const transaction = await TransactionModel.find({createdAt: {$gte: new Date(`${monthNYearToSearch}-1`), 
            $lt: new Date(`${monthNYearToSearch}-31`)}, user:userToSearch})

            //checks if id is null
            if (!transaction) {
                res.status(404).json({ msg: "didn't found any transactions" })
                return
            }   

            res.json(transaction)
        } catch (error) {
            console.log(`error: ${error}`);
        }
    },


    complexSearch: async(req, res)=>{
        try {
            const userToSearch = req.params.user

            const providedDescription = req.body.searchDescription;
            const providedValue = req.body.searchValue;
            const providedType = req.body.searchType; //expense or income
            const providedCategory = req.body.searchCategory;
            const providedStartDate = req.body.startDate;
            const providedEndDate = req.body.endDate;
            
            const searchFilter = { user: userToSearch }

            //checks if an description was provided
            //if so, the description will be added into the search criteria
            if (providedDescription) 
                searchFilter.description = providedDescription
            
            if(providedValue != undefined && providedValue != 0)
                searchFilter.value = providedValue

            if(providedType)
                searchFilter.type = providedType

            if(providedCategory)
                searchFilter.category = providedCategory

            if(providedStartDate){
                if(!providedEndDate){
                    searchFilter.createdAt = { $gte: providedStartDate, $lte: new Date()}
                }
                else
                    searchFilter.createdAt = { $gte: providedStartDate, $lte: providedEndDate}
            }
                

            
            console.log(searchFilter);
            const transaction = await TransactionModel.find(searchFilter)
      
            if (!transaction) {
              res.status(404).json({ msg: "didn't found any transactions" });
              return;
            } 
      
            res.json(transaction)
          } catch (error) {
            console.log(`error: ${error}`);
          }
    },

}


module.exports = transactionController
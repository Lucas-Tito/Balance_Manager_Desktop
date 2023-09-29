const { userModel: UserModel } = require("../models/userModel")

const userController = {

    create: async(req, res) => {
        try {
            const user = {
                email: req.body.email,
                nome: req.body.nome,
                senha: req.body.senha,
            }
            
            const response = await UserModel.create(user)

            res.status(201).json({response, msg:"User created successfully"})

        } catch (error) {
            console.log(`error: ${error}`);
        }
    },




    delete: async(req, res)=>{
        try {
            const id = req.params.id
            const user = await UserModel.findById(id)

            //checks if id is null
            if (!user) {
                res.status(404).json({ msg: "user not found" })
                return
            }   

            const deletedUser = await UserModel.findOneAndDelete(id)
            res.status(200).json({deletedUser, msg: "user deleted successfully"})
        } catch (error) {
            console.log(`error: ${error}`);
        }
    },





    update: async(req, res)=>{
        try {
        const id = req.params.id

        const user = {
            email: req.body.email,
            nome: req.body.nome,
            senha: req.body.senha,
        }
        const updatedUser = await UserModel.findByIdAndUpdate(id, user)

        //checks if id is null
        if (!updatedUser) {
            res.status(404).json({ msg: "user not found" })
            return
        }   

        res.status(200).json({updatedUser, msg: "user updated successfully"})

        } catch (error) {
            console.log(`error: ${error}`);
        }
    },




    get: async(req, res)=>{
        try {
            const id = req.params.id
            const user = await UserModel.findById(id)

            //checks if id is null
            if (!user) {
                res.status(404).json({ msg: "user not found" })
                return
            }   

            res.json(user)
        } catch (error) {
            console.log(`error: ${error}`);
        }
    },



    getAll: async(req, res) =>{

        try {
            const user = await UserModel.find() 

            res.json(user)

        } catch (error) {
            console.log(`error: ${error}`);
        }
    }

}


module.exports = userController
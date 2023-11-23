const { userModel: UserModel } = require("../models/userModel");

const userController = {
  create: async (req, res) => {
    try {
      const user = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
      };

      const user_search = await UserModel.findOne({ email: user.email });

      if (user_search) {
        res.status(404).json({ msg: "exists" });
        return;
      }

      const response = await UserModel.create(user);

      res.status(201).json({ response, msg: "success" });
    } catch (error) {
      console.log(`error: ${error}`);
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await UserModel.findById(id);

      //checks if id is null
      if (!user) {
        res.status(404).json({ msg: "user not found" });
        return;
      }

      const deletedUser = await UserModel.findByIdAndDelete(id);
      res.status(200).json({ deletedUser, msg: "user deleted successfully" });
    } catch (error) {
      console.log(`error: ${error}`);
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;

      const user = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
      };
      const updatedUser = await UserModel.findByIdAndUpdate(id, user);

      //checks if id is null
      if (!updatedUser) {
        res.status(404).json({ msg: "user not found" });
        return;
      }

      res.status(200).json({ updatedUser, msg: "user updated successfully" });
    } catch (error) {
      console.log(`error: ${error}`);
    }
  },

  get: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await UserModel.findById(id);

      //checks if id is null
      if (!user) {
        res.status(404).json({ msg: "user not found" });
        return;
      }

      res.json(user);
    } catch (error) {
      console.log(`error: ${error}`);
    }
  },

  login: async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const user = await UserModel.findOne({ email: email });

      if (!user) {
        res.status(404).json({ msg: "user not found" });
        return;
      } else if (password !== user.password) {
        res.status(404).json({ msg: "user not found" });
        return;
      }

      res.status(200).json({ msg: "ok", user: user._id.toString() });
    } catch (error) {
      console.log(`error: ${error}`);
    }
  },

  getAll: async (req, res) => {
    try {
      const user = await UserModel.find();

      res.json(user);
    } catch (error) {
      console.log(`error: ${error}`);
    }
  },


  getAllUserCategories: async(req, res) =>{
    try {
        const id = req.params.id;
        const categories = await UserModel.findById(id, 'custom_categories');

        //checks if id is null
        if (!categories) {
          res.status(404).json({ msg: "didn't found any users" })
          return
        }   
        
        res.json(categories)

    } catch (error) {
        console.log(`error: ${error}`);
    }
},

};

module.exports = userController;

const { ObjectId } = require("mongoose").Types;
const { User, Thought, Reaction } = require("../models");

module.exports = {
  // get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();

      users.forEach(user => {
        console.log(Array.isArray(user.thoughts));
        user.thoughts.forEach(thought => {
          console.log(typeof thought);
        })
      });

      const userObj = {
        users,
      };

      res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // get a single user by its id and populated thought and friend data
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
      // DAVE THERE'S A PROBLEM IN HERE SOMEWHERE
        .select("-__v")
        .populate("thoughts")
        .populate("friends");
      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      console.log(Array.isArray(user.thoughts));

      res.json({
        
        user,
      });

    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // post a new user
  // example data:
  // {
  //  "username" : "dave",
  //  "email" : "dave@mail.com"
  //}
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // PUT to update a user by id
  // can send new username and email
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(404).json({ message: "No user with this id!" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        res.status(404).json({ message: "No user with this id!" });
      }
      res.json({ message: "User deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

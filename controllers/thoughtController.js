const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

module.exports = {
  // get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();

      const thoughtObj = {

        thoughts,
      }
    

    res.json(thoughtObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }

  },

  // get a single thought by its id
async getSingleThought(req, res) {
  try {
    const thought = await Thought.findOne({_id: req.params.thoughtId})
    .select('-__v');

    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID'})
    }

    res.json({
      thought

    });

  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }



},

// post a new thought
async createThought(req,res) {
  try {
    const thought = await Thought.create(req.body);
    console.log(thought._id instanceof ObjectId);
    const user = await User.findOne({username: req.body.username});
    if(user) {
      console.log(typeof user.thoughts);

      user.thoughts.push(new ObjectId(thought._id));
    await user.save();


 res.status(200).send({ message: "Thought added successfully", }); //thought: thought });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

},

// PUT to update a thought by id
// can send new username and email
async updateThought(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      { $set: req.body },
      { runValidators: true, new: true }



    );
    if (!thought) {
      res.status(404).json({message: "No thought with this id!"});
    }
res.json(thought);
  } catch (err) {
    res.status(500).json(err);

  }

},

async deleteThought(req, res) {
  try {
    const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId});

    if (!thought) {
      res.status(404).json({message: 'No thought with this id!'});
    }

    const user = await User.findOne({ thoughts: req.params.thoughtId });
      if(user) {
        user.thoughts.pull(req.params.thoughtId);  // pull is a method provided by Mongoose to remove the item from the array
        await user.save();
      }

    res.json({message: "Thought deleted!"});

  } catch (err) {
    res.status(500).json(err);
  }


},



};

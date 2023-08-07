const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

module.exports = {

// post a new reaction
async createReaction(req,res) {
  try {
    

    const thought = await Thought.findOne({_id: req.params.thoughtId});
    console.log(thought);
    if(thought) {
      const reaction = {
        reactionBody: req.body.reactionBody,
        username: req.body.username,
      }
      console.log(reaction);
      thought.reactions.push(reaction);
      await thought.save();
      res.status(200).send({message: 'Reaction added successfully'});

    } else {
      res.stats(404).send({message: 'Thought not found'});
    }}
  catch (err) {
      res.status(500).json(err);
    };

},



async deleteReaction(req, res) {
  try {
      const thought = await Thought.findOne({_id: req.params.thoughtId});
    reaction = 
      thought.reactions.pull(req.params.reactionId)
await thought.save();
    res.json({message: "Reaction deleted!"});

  } catch (err) {
    res.status(500).json(err);
  }


},



};

const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

module.exports = {

// post a new reaction
async createReaction(req,res) {
  try {
    const reaction = await Reaction.create(req.body);
    res.json(reaction);

    const thought = await Thought.findOne({thoughtId: req.params.thoughtId});
    if(thought) {
      thought.reactions.push(reaction);
      await thought.save();
      res.status(200).send({message: 'Reaction added successfully', reaction: reaction});

    } else {
      res.stats(404).send({message: 'Thought not found'});
    }}
  catch (err) {
      res.status(500).json(err);
    };

},



async deleteReaction(req, res) {
  try {
    const reaction = await Reaction.findOneAndDelete({_id: req.params.reactionId});

    if (!reaction) {
      res.status(404).json({message: 'No reaction with this id!'});
    }
    res.json({message: "Reaction deleted!"});

  } catch (err) {
    res.status(500).json(err);
  }


},



};

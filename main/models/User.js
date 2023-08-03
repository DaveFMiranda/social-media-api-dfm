const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      max_length: 16,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      max_length: 50,
    },
    // TO DO: array of _id values referencing the Thought model
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }],
    friends: [  {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;

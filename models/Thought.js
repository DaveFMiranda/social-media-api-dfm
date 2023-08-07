const { Schema, Types, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// formats date into readable format
function dateFormat(date) {
  const options = { month: "long", day: "numeric", year: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

// creates schema for Thoughts
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// virtual to count a thought's reactions
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;

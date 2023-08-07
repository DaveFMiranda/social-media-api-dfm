const { Schema, Types } = require("mongoose");

// format date into readable format
function dateFormat(date) {
  const options = { month: "long", day: "numeric", year: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

// Schema to create a reaction
const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

module.exports = reactionSchema;

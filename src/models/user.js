const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    discordId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    guilds: {
      type: Array,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = model("User", userSchema);

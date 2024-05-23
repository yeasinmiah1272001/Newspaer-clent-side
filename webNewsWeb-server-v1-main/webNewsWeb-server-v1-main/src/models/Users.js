const { Schema, default: mongoose } = require("mongoose");

const UserScheme = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  premiumTaken: {
    type: String,
    default: "no",
  },
  roll: {
    type: String,
    required: true,
  },
  time: String,
});

const Users = mongoose.model("users", UserScheme);
module.exports = Users;

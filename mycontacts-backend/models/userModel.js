const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Provide User Name"],
    },
    email: {
      type: String,
      required: [true, "Please Provide Email Address"],
      unique: [true, "Email Adress Already registed"],
    },
    password: {
      type: String,
      required: [true, "Please Provide Password"],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const detailsSchema = mongoose.Schema({
  code: {
    type: String,
  },
  phone: {
    type: String,
  },
});

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please Provide Contact Name"],
    },
    details: [detailsSchema],
    email: {
      type: String,
      required: [true, "Please Provide Email Adress"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);

const mongoose = require("mongoose");
const User = require("./userModel.js");

const mediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  shortUrl: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Media = mongoose.model("Media", mediaSchema);

module.exports = Media;
const mongoose = require("mongoose");
const User = require("./userModel.js");

const mediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  shortUrl: {
    type: String,
  }
});

const Media = mongoose.model("Media", mediaSchema);
module.exports = Media;

const mongoose = require("mongoose");
// import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    clerkUserId: { type: String, unique: true, required: true },
    email: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

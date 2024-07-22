const mongoose = require("mongoose");
const svix = require("svix");
const bodyParser = require("body-parser");
const User = require("../models/userModel.js");
const e = require("express");
// import mongoose from "mongoose";
// import { Webhook } from "svix";
// import bodyParser from "body-parser";
// import User from "../models/userModel.js";
// import e from "express";

const app = e();

// Real code
app.post(
  "/webhooks",
  bodyParser.raw({ type: "application/json" }),
  async function (req, res) {
    try {
      const payloadString = req.body.toString();
      const svixHeaders = req.headers;

      const wh = new svix.Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
      const evt = wh.verify(payloadString, svixHeaders);
      const { id, ...attributes } = evt.data;
      // Handle the webhooks
      const eventType = evt.type;
      if (eventType === "user.created") {
        console.log(`User ${id} was ${eventType}`);

        const email = attributes.email_addresses[0].email_address;
        console.log(attributes.email_addresses[0].email_address);

        const user = new User({
          clerkUserId: id,
          email: email,
        });

        await user.save();
        console.log("User saved to database");
      }
      res.status(200).json({
        success: true,
        message: "Webhook received",
      });
    } catch (err) {
    //   console.log("ASDF");
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
);

module.exports = app;

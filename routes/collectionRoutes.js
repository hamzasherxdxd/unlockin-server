const express = require("express");
const Collections = require("../models/collections");
const router = express.Router();

router.post("/create-collection", async (req, res) => {
  try {
    const collection = new Collections();
    collection.title = req.body.title;
    collection.media = [];
    console.log(req.body);
    // req.body.media.forEach((media) => {
    //   collection.media.push(media);
    // });
    const savedCollection = await collection.save();
    res.json({
      message: "Collection created successfully",
      collection: savedCollection,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "An Error occured while trying to save",
    });
  }
});

router.post("/add-media", async (req, res) => {
  try {
    console.log(req.body);
    const collection = await Collections.findOne({
      _id: req.body._id,
    });
    const media = req.body.media;
    console.log(media);
    collection.media.push(media);
    const savedCollection = await collection.save();
    res.json({
      message: `Media added to Collection ${collection.title} Successfully`,
      collection: savedCollection,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "An Error occured while trying to save",
    });
  }
});

module.exports = router;

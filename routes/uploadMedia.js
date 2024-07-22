const e = require("express")
const router = e.Router();
const upload = require("../middlewares/mediaMiddleware.js");
const Media = require("../models/mediaModel.js");

router.post("/media", upload.array("files", 5), async (req, res) => {
  try {
    const media = new Media();
    media.title = req.body.title;
    media.url = [];
    req.files.forEach((file) => {
      media.url.push(file.location);
    });
    // media.url = req.file.location;
    const savedMedia = await media.save();
    res.json({
      message: "Media Uploaded Successfully",
      media: savedMedia,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: "An error occured while uploading the video",
    });
  }
});

module.exports = router;

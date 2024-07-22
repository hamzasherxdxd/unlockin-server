const express = require("express");
const {
  handleGenerateNewShortURL,
  getRedirectUrl,
} = require("../middlewares/urlMiddleware.js");
const URL = require("../models/urlModel.js");

const router = express.Router();

router.post("/url", handleGenerateNewShortURL);
router.get("/:shortId", getRedirectUrl);

module.exports = router;

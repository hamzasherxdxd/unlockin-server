const shortid = require("shortid");
const URL = require("../models/urlModel.js");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL REQUIRED" });
  const shortId = shortid();

  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
  });

  return res.json({ id: shortId });
}

async function getRedirectUrl(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOne({
    shortId,
  });
  console.log(entry);
  res.redirect(`${entry.redirectUrl}`);
}

module.exports = { handleGenerateNewShortURL, getRedirectUrl };

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const loginMiddleware = require("./middlewares/loginMiddleware.js");
const uploadMedia = require("./routes/uploadMedia.js");
const mediaLink = require("./routes/shortUrl.js");
const collectionLink = require("./routes/collectionRoutes.js");
dotenv.config();

// Connect mongoose to database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err.message));

const app = express();
app.use(express.json());

app.use(cors());
app.use("/api", loginMiddleware);
app.use("/api", uploadMedia);
app.use("/api", mediaLink);
app.use("/api", collectionLink);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});

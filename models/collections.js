const mongoose = require("mongoose");

const collectionsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    media: {
        type: Array,
        // required: true,
    },
})

const Collections = mongoose.model("Collections", collectionsSchema);

module.exports = Collections;

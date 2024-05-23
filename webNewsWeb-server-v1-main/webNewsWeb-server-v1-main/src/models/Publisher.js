const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
  publisher_name: {
    type: String,
    required: true,
  },
  publisher_logo: {
    type: String,
    required: true,
  },
});

const Publisher = mongoose.model("Publisher", publisherSchema);

module.exports = Publisher;

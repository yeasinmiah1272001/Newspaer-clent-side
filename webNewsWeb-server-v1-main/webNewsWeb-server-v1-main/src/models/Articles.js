const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  viewers: {
    type: Number,
    default: 0,
  },
  premium: {
    type: String,
    default: "free",
  },
  publish_date: {
    type: String,
    required: true,
  },
  author_email: {
    type: String,
    required: true,
  },
  author_name: {
    type: String,
    required: true,
  },
  author_image: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  message: {
    type: String,
    default: "No message",
  },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;

const express = require("express");
const {
  createArticles,
  getAllArticles,
  getSingleArticle,
  updateArticle,
  deleteArticle,
  updateSingleArticle,
  getUserArticle,
  articleNotification,
  getNotification,
} = require("../../api/articles");
const getAllArticleCollection = require("../../api/articles/getAllArticleCollection");
const verifyToken = require("../../middlewares/verifyToken");
const router = express.Router();
router.post("/article", createArticles);
router.get("/articles", getAllArticles);
router.get("/article/:id", getSingleArticle);
router.put("/update/:id", updateArticle);
router.delete("/article/:id", deleteArticle);
router.get("/all-article", getAllArticleCollection);
router.patch("/article/:id", updateSingleArticle);
router.get("/user-article/:author_email", verifyToken, getUserArticle);
router.put("/notification/:id", articleNotification);
router.get("/notification", getNotification);
module.exports = router;

const Article = require("../../models/Articles");

const updateSingleArticle = async (req, res) => {
  const articleId = req.params.id;
  const updatedArticleData = req.body;

  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      articleId,
      { $set: updatedArticleData },
      { new: true }
    );

    res.json({ message: "Article updated successfully", success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = updateSingleArticle;

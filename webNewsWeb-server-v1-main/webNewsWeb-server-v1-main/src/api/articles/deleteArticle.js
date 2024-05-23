const Article = require("../../models/Articles");

const deleteArticle = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedArticle = await Article.findByIdAndDelete(id);

    res
      .status(200)
      .json({ message: "Article deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = deleteArticle;

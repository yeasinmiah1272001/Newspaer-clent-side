const Article = require("../../models/Articles");

const updateArticle = async (req, res) => {
  const id = req.params.id;
  const article = req.body;

  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { ...article },
      { new: true }
    );

    res.status(200).json({
      message: "Article updated successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updateArticle;

const Article = require("../../models/Articles");

const getSingleArticle = async (req, res) => {
  try {
    const id = req.params.id;
    const updateView = await Article.findOneAndUpdate(
      { _id: id },
      { $inc: { viewers: 1 } },
      { new: false }
    );
    const article = await Article.findById(id);
    res.status(200).send(article);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = getSingleArticle;

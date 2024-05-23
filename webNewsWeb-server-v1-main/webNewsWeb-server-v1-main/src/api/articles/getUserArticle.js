const Article = require("../../models/Articles");

const getUserArticle = async (req, res) => {
  const author_email = req.params.author_email;

  if (author_email !== req.user?.email) {
    return res.status(403).send({ message: "access denied" });
  }

  try {
    const articles = await Article.find({ author_email });

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getUserArticle;

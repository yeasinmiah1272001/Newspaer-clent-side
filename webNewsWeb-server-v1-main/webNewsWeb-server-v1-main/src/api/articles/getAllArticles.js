const Article = require("../../models/Articles");

const getAllArticles = async (req, res) => {
  try {
    const { title, tag, publisher } = req.query;

    let query = {};

    if (title !== "") {
      query.title = new RegExp(title, "i");
    }
    if (tag !== "") {
      query.tags = { $in: tag };
    }
    if (publisher !== "") {
      query.publisher = new RegExp(publisher, "i");
    }

    const articles = await Article.find(query);

    res.status(200).send(articles);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = getAllArticles;

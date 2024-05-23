const Article = require("../../models/Articles");

const createArticle = async (req, res) => {
  try {
    const { title } = req.body;
    const article = req.body;
    const existingArticle = await Article.findOne({ title });

    if (existingArticle) {
      return res
        .status(400)
        .send({ message: "Article with this title already exists" });
    }

    const newArticle = new Article({
      ...article,
    });

    const result = await newArticle.save();

    res
      .status(201)
      .json({ message: "Article created successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = createArticle;

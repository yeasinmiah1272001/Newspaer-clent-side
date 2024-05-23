const Article = require("../../models/Articles");

const getAllArticleCollection = async (req, res) => {
  try {
    // const isAdmin = await Users.findOne({ email: req.user?.email });
    // const { roll } = isAdmin;
    // if (roll !== "admin") {
    //   return res.status(403).send({ message: "access denied" });
    // }
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const article = await Article.find()
      .skip(page * pageSize)
      .limit(pageSize);
    const totalCount = await Article.countDocuments();
    res.send({ article, totalCount });
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
};

module.exports = getAllArticleCollection;

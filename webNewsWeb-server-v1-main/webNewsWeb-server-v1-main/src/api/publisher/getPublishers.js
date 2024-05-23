const Publisher = require("../../models/Publisher");

const getPublishers = async (req, res) => {
  try {
    const allPublishers = await Publisher.find();
    res.json(allPublishers);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getPublishers;

const Publisher = require("../../models/Publisher");

const createPublisher = async (req, res) => {
  try {
    const publisher = req.body;
    const { publisher_name } = publisher;
    const existingPublisher = await Publisher.findOne({
      publisher_name: publisher_name,
    });

    if (existingPublisher) {
      return res.status(400).json({ message: "Publisher name already exists" });
    }

    const newPublisher = new Publisher({
      ...publisher,
    });

    await newPublisher.save();
    res.status(201).json({
      message: "Publisher created successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = createPublisher;

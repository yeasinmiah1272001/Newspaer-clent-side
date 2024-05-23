const Notification = require("../../models/Notification");

const articleNotification = async (req, res) => {
  const articleId = req.params.id;
  const updateData = req.body; // Assuming you send the updated data in the request body

  try {
    // Find the article by ID and update it
    const updatedArticle = await Notification.findByIdAndUpdate(
      articleId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedArticle) {
      const newArticle = new Notification({
        _id: articleId,
        ...updateData,
      });

      const savedArticle = await newArticle.save();
      return res.status(201).json({ success: true });
    }

    res.status(200).send({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = articleNotification;

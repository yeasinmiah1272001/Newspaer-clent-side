const Notification = require("../../models/Notification");

const getNotification = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
   
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getNotification;

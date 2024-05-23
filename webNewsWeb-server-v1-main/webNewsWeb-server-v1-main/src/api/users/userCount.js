const Users = require("../../models/Users");

const getUserCount = async (req, res) => {
  try {
    const users = await Users.find();
    res.send(users);
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = getUserCount;

const Users = require("../../models/Users");

const getSingleUser = async (req, res) => {
  try {
    if (req.params?.email !== req.user?.email) {
      return res.status(403).send({ message: "access denied" });
    }
    const { email } = req.params;

    const user = await Users.findOne({ email });

    if (user) {
      // User found
      res.status(200).send(user);
    } else {
      // User not found
      res.status(404).send({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = getSingleUser;

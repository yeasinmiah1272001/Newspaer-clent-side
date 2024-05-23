const jwt = require("jsonwebtoken");
const generateToken = require("../../utils/generetToken");

require("dotenv").config();

const createCookieToken = async (req, res) => {
  const user = req.body;
  const token = generateToken(user);
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
    .send({ success: true });
};

module.exports = createCookieToken;

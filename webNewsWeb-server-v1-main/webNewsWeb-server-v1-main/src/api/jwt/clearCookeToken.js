const clearCookieToken = async (req, res) => {
  res.clearCookie("token");

  res.status(200).send({ success: true });
};

module.exports = clearCookieToken;

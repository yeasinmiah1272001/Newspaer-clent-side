const express = require("express");
const { createCookieToken, clearCookieToken } = require("../../api/jwt");
const router = express.Router();

router.post("/jwt", createCookieToken);
router.get("/clearAccessToken", clearCookieToken);

module.exports = router;

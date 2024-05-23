const express = require("express");
const payment = require("../../api/paymentIntent/paymentIntent");
const router = express.Router();

router.post("/create-paymentIntent", payment);
module.exports = router;

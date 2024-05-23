const express = require("express");
const { createPublisher, getPublishers } = require("../../api/publisher");
const router = express.Router();

router.post("/publisher", createPublisher);
router.get("/publishers", getPublishers);

module.exports = router;

const express = require("express");
const chatController = require("../controller/chatController");

const router = express.Router();

router.route("/").post(chatController.startChat);

module.exports = router;
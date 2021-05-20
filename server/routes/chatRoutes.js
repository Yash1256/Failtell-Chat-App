const express = require("express");
const chatController = require("../controller/chatController");
const authController = require("../controller/authController");

const router = express.Router();

router
  .route("/createChat")
  .post(authController.protectAccess, chatController.startUserChat);
router
  .route("/getUserChats")
  .get(authController.protectAccess, chatController.getUserChats);
router
  .route("/deleteChats")
  .delete(authController.protectAccess, chatController.deleteUserChat);
router
  .route("/updateChat")
  .patch(authController.protectAccess, chatController.updateUserChat);

module.exports = router;

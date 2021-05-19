const express = require("express");
const chatController = require("../controller/chatController");
const authController = require("../controller/authController");

const router = express.Router();

router
  .route("/createChat/:username")
  .post(authController.currentUser, chatController.startUserChat);
router
  .route("/getUserChats/:username")
  .get(authController.currentUser, chatController.getUserChats);
router
  .route("/deleteChats/:username")
  .delete(authController.currentUser, chatController.deleteUserChat);
router
  .route("/updateChat/:username")
  .patch(authController.currentUser, chatController.updateUserChat);

module.exports = router;

const express = require("express");
const authController = require("../controller/authController");

const router = express.Router();

router.route("/signUp").post(authController.signUp);
router.route("/login").post(authController.login);
router
  .route("/logout")
  .get(authController.protectAccess, authController.logout);
router.route("/isLoggedIn").get(authController.isLoggedIn);
router
  .route("/assignRoom/:chatWithUsername")
  .post(authController.protectAccess, authController.assignRoom);

router.route("/getMe").post(authController.protectAccess, authController.getMe);

module.exports = router;

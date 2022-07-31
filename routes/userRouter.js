const express = require("express");
const router = express.Router();
const {
  getSingleUser,
  showMyProfile,
  getAllUsers,
  editUserProfile,
  updateUserPassword,
  deleteUserProfile,
} = require("../controllers/userController");
const authenticateUser = require("../middlewares/authentication");

router.route("/").get(authenticateUser, getAllUsers);

router.route("/profile").get(authenticateUser, showMyProfile);

router
  .route("/profile/updatePassword")
  .patch(authenticateUser, updateUserPassword);

router
  .route("/profile/deleteMyAccount")
  .delete(authenticateUser, deleteUserProfile);

router
  .route("/:id")
  .get(getSingleUser)
  .patch(authenticateUser, editUserProfile);

module.exports = router;

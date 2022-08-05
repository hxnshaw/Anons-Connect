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
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

router.route("/").get(authenticateUser, getAllUsers);

router.route("/profile").get(authenticateUser, showMyProfile);

router
  .route("/profile/updatePassword")
  .patch(authenticateUser, updateUserPassword);

router
  .route("/profile/deleteMyAccount")
  .delete(authenticateUser, authorizePermissions("admin"), deleteUserProfile);

router
  .route("/:id")
  .get(authenticateUser, authorizePermissions("admin"), getSingleUser)
  .patch(authenticateUser, editUserProfile);

module.exports = router;

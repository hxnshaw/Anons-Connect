const express = require("express");
const router = express.Router();
const {
  getSingleUser,
  showMyProfile,
  getAllUsers,
  editUserProfile,
  updateUserPassword,
  deleteUserProfile,
  followUser,
  unfollowUser,
} = require("../controllers/userController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllUsers);

router.route("/profile").get(authenticateUser, showMyProfile);

router
  .route("/profile/updatePassword")
  .patch(authenticateUser, updateUserPassword);

router
  .route("/profile/deleteMyAccount")
  .delete(authenticateUser, authorizePermissions("admin"), deleteUserProfile);

router.route("/:id/follow").patch(authenticateUser, followUser);

router.route("/:id/unfollow").patch(authenticateUser, unfollowUser);

router
  .route("/:id")
  .get(authenticateUser, authorizePermissions("admin"), getSingleUser)
  .patch(authenticateUser, editUserProfile);

module.exports = router;

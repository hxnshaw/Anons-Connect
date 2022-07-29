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

router.route("/").get(getAllUsers);

router.route("/profile").get(showMyProfile);

router.route("/profile/updatePassword").patch(updateUserPassword);

router.route("/profile/deleteMyAccount").delete(deleteUserProfile);

router.route("/:id").get(getSingleUser).patch(editUserProfile);

module.exports = router;

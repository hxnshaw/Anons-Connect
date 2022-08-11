const express = require("express");
const router = express.Router();
const {
  createPost,
  singlePost,
  getAllPosts,
  editPost,
  deletePost,
  likePost,
  myTimeline,
  uploadImage,
} = require("../controllers/postController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

router
  .route("/")
  .post(authenticateUser, createPost)
  .get(authenticateUser, getAllPosts);

router.route("/myTimeline").get(authenticateUser, myTimeline);

router.route("/uploadImage").post(authenticateUser, uploadImage);

router.route("/:id/like").patch(authenticateUser, likePost);

router
  .route("/:id")
  .get(authenticateUser, singlePost)
  .patch(authenticateUser, editPost)
  .delete(authenticateUser, authorizePermissions("admin"), deletePost);

module.exports = router;

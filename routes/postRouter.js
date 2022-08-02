const express = require("express");
const router = express.Router();
const {
  createPost,
  singlePost,
  getAllPosts,
  editPost,
  deletePost,
} = require("../controllers/postController");
const authenticateUser = require("../middlewares/authentication");

router
  .route("/")
  .post(authenticateUser, createPost)
  .get(authenticateUser, getAllPosts);

router
  .route("/:id")
  .get(authenticateUser, singlePost)
  .patch(authenticateUser, editPost)
  .delete(authenticateUser, deletePost);

module.exports = router;

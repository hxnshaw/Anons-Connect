const express = require("express");
const router = express.Router();
const {
  createPost,
  singlePost,
  getAllPosts,
  editPost,
  deletePost,
} = require("../controllers/postController");

router.route("/").post(createPost).get(getAllPosts);

router.route("/:id").get(singlePost).patch(editPost).delete(deletePost);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  createComment,
  singleComment,
  getAllComments,
  deleteComment,
} = require("../controllers/commentController");
const authenticateUser = require("../middlewares/authentication");

router
  .route("/")
  .post(authenticateUser, createComment)
  .get(authenticateUser, getAllComments);

router
  .route("/:id")
  .get(authenticateUser, singleComment)
  .delete(authenticateUser, deleteComment);

module.exports = router;

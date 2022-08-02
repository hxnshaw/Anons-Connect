const express = require("express");
const router = express.Router();
const {
  createComment,
  singleComment,
  getAllComments,
  deleteComment,
} = require("../controllers/commentController");

router.route("/").post(createComment).get(getAllComments);

router.route("/:id").get(singleComment).delete(deleteComment);

module.exports = router;

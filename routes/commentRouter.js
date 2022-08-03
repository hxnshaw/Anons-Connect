const express = require("express");
const router = express.Router();
const {
  createComment,
  singleComment,
  getAllComments,
  deleteComment,
} = require("../controllers/commentController");
const authenticateUser = require("../middlewares/authentication");

router.route("/").post(createComment).get(getAllComments);

router.route("/:id").get(singleComment).delete(deleteComment);

module.exports = router;

const Comment = require("../models/Comment");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Post = require("../models/Post");

const createComment = async (req, res) => {
  const { post: postId } = req.body;
  const post = await Post.findOne({ _id: postId });

  if (!post) {
    throw new CustomError.NotFoundError("POST NOT FOUND");
  }

  req.body.user = req.user.userId;
  const comment = await Comment.create(req.body);
  res.status(StatusCodes.CREATED).json({ comment });
};

const singleComment = async (req, res) => {
  const { id: commentId } = req.params;

  const comment = await Comment.findOne({ _id: commentId }).populate({
    path: "user",
    select: "username",
  });

  if (!comment) {
    throw new CustomError.NotFoundError(`NO COMMENT WITH ID ${commentId} `);
  }
  res.status(StatusCodes.OK).json({ comment });
};

const getAllComments = async (req, res) => {
  const comments = await Comment.find({}).populate("post").populate({
    path: "user",
    select: "username",
  });
  res.status(StatusCodes.OK).json({ comments });
};

const deleteComment = async (req, res) => {
  res.send("Delete a comment");
};

module.exports = {
  createComment,
  singleComment,
  getAllComments,
  deleteComment,
};

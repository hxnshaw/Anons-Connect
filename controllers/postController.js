const Post = require("../models/Post");
const User = require("../models/User");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const checkPermissions = require("../utils/checkPermissions");

const createPost = async (req, res) => {
  req.body.user = req.user.userId;
  const post = await Post.create({ ...req.body, anon: req.user.userId });
  res.status(StatusCodes.CREATED).json({ post });
};

const singlePost = async (req, res) => {
  const { id: postId } = req.params;
  const post = await Post.findOne({ _id: postId })
    .populate("comments")
    .populate("likes");
  res.status(StatusCodes.OK).json({ post, number_of_likes: post.likes.length });
};

const getAllPosts = async (req, res) => {
  const posts = await Post.find({}).populate("comments");
  res.status(StatusCodes.OK).json({ posts });
};

const editPost = async (req, res) => {
  const { heading, body } = req.body;
  const { id: postId } = req.params;
  const post = await Post.findOne({ _id: postId });
  if (!post) {
    throw new CustomError.NotFoundError(`POST NOT FOUND`);
  }

  checkPermissions(req.user, post.anon);

  post.heading = heading;
  post.body = body;

  await post.save();
  res.status(StatusCodes.OK).json({ post, msg: "POST UPDATED SUCCESSFULLY" });
};

const deletePost = async (req, res) => {
  const { id: postId } = req.params;
  const post = await Post.findOne({ _id: postId });
  if (!post) {
    throw new CustomError.NotFoundError(`POST NOT FOUND`);
  }

  checkPermissions(req.user, post.anon);

  await post.remove();
  res.status(StatusCodes.OK).json({ msg: "DELETED!" });
};

//LIKE AND UNLIKE A POST.
const likePost = async (req, res) => {
  const { id: postId } = req.params;
  const post = await Post.findOne({ _id: postId });
  if (!post.likes.includes(req.user.userId)) {
    await post.updateOne({ $push: { likes: req.user.userId } });
    console.log(req.user.userId);
    res.status(StatusCodes.OK).json({ msg: "LIKE" });
  } else if (post.likes.includes(req.user.userId)) {
    await post.updateOne({ $pull: { likes: req.user.userId } });
    res.status(StatusCodes.OK).json({ msg: "REMOVED LIKE" });
  }
};

//view your posts and posts from people you follow.
const myTimeline = async (req, res) => {
  const currentUser = await User.findOne({ _id: req.user.userId });
  const userPosts = await Post.find({ _id: currentUser.userId });
  const friendPosts = await Promise.all(
    currentUser.following.map((friendId) => {
      return Post.find({ userId: friendId });
    })
  );
  res.status(StatusCodes.OK).json(userPosts.concat(...friendPosts));
};

module.exports = {
  createPost,
  singlePost,
  getAllPosts,
  editPost,
  deletePost,
  likePost,
  myTimeline,
};

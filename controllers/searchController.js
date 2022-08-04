const Post = require("../models/Post");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const searchForPosts = async (req, res, next) => {
  let search_key = req.query["category"];
  console.log(search_key);
  try {
    let posts = await Post.find({ category: search_key });
    res.status(StatusCodes.OK).json({ count: posts.length, posts });
  } catch (error) {
    throw new CustomError.BadRequestError(error.message);
  }
};

module.exports = searchForPosts;

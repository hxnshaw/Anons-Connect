const Post = require("../models/Post");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const searchForPosts = async (req, res, next) => {
  let search_key = req.query["category"];
  console.log(search_key);
  Post.find({ category: search_key })
    .then((posts) => {
      res.json({ count: posts.length, posts });
    })
    .catch((err) => {
      throw new CustomError.BadRequestError(err.message);
      // res.status(StatusCodes.BAD_REQUEST).json({ msg: err.message });
    });
};

module.exports = searchForPosts;

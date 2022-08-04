const Comment = require("../models/Comment");

const createComment = async (req, res) => {
  res.send("Create a new comment");
};

const singleComment = async (req, res) => {
  res.send("Get a single comment");
};

const getAllComments = async (req, res) => {
  res.send("Get all comments");
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

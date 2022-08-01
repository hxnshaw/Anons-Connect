const createPost = async (req, res) => {
  res.send("Create Post");
};

const singlePost = async (req, res) => {
  res.send("Single Post");
};

const getAllPosts = async (req, res) => {
  res.send("Get All Posts");
};

const editPost = async (req, res) => {
  res.send("Edit Post");
};

const deletePost = async (req, res) => {
  res.send("Delete Post");
};

module.exports = {
  createPost,
  singlePost,
  getAllPosts,
  editPost,
  deletePost,
};

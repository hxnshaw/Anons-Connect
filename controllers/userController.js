const User = require("../models/User");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getSingleUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOne({ _id: userId }).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError(`USER NOT FOUND.`);
  }
  res.status(StatusCodes.OK).json({ user });
};

const showMyProfile = async (req, res) => {
  res.send("Show User Profile");
};

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ count: users.length, users });
};

const editUserProfile = async (req, res) => {
  res.send("Edit User Profile");
};

const updateUserPassword = async (req, res) => res.send("Update User Password");

const deleteUserProfile = async (req, res) => {
  res.send("Delete User Profile");
};

module.exports = {
  getSingleUser,
  showMyProfile,
  getAllUsers,
  editUserProfile,
  updateUserPassword,
  deleteUserProfile,
};

const User = require("../models/User");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { createTokenUser, attachCookiesToResponse } = require("../utils");

const getSingleUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOne({ _id: userId }).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError(`USER NOT FOUND.`);
  }
  res.status(StatusCodes.OK).json({ user });
};

const showMyProfile = async (req, res) => {
  //prevent users from viewing their profile after they delete their account.
  const userId = req.user.userId;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw CustomError.UnauthorizedError("UNAUTHORIZED TO ACCESS THIS ROUTE!");
  }
  //show user profile if user exists.
  res.status(StatusCodes.OK).json({ user: req.user });
};

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ count: users.length, users });
};

const editUserProfile = async (req, res) => {
  const { email, age, username } = req.body;
  if (!email || !age || !username) {
    throw new CustomError.BadRequestError("PLEASE ENTER VALID CREDENTIALS");
  }
  const user = await User.findOne({ _id: req.user.userId });
  if (!user) {
    throw new CustomError.NotFoundError("USER DOES NOT EXIST");
  }
  user.email = email;
  user.age = age;
  user.username = username;
  await user.save();

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res
    .status(StatusCodes.OK)
    .json({ user: tokenUser, msg: "PROFILE UPDATED SUCCESSFULLY!" });
};

const updateUserPassword = async (req, res) => {
  const { password, newPassword } = req.body;
  if (!password || !newPassword) {
    throw new CustomError.BadRequestError("PLEASE ENTER VALID CREDENTIALS");
  }
  const user = await User.findOne({ _id: req.user.userId });
  if (!user) {
    throw new CustomError.NotFoundError("USER DOES NOT EXIST");
  }
  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).json({ msg: "PASSWORD CHANGE SUCCESSFUL" });
};

const deleteUserProfile = async (req, res) => {
  const userId = req.user.userId;
  const user = await User.findOne({ _id: userId });
  //Delete the token.
  res.cookie("token", "DeleteUser", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  await user.remove();
  res.status(StatusCodes.OK).json({ msg: "PROFILE DELETED SUCCESSFULLY" });
};

const followUser = async (req, res) => {
  res.send("Now following user xyz");
};

const unfollowUser = async (req, res) => {
  res.send("You unfollowed user xyz");
};

module.exports = {
  getSingleUser,
  showMyProfile,
  getAllUsers,
  editUserProfile,
  updateUserPassword,
  deleteUserProfile,
  followUser,
  unfollowUser,
};

const getSingleUser = async (req, res) => {
  res.send("Single User");
};

const showMyProfile = async (req, res) => {
  res.send("Show My Profile");
};

const getAllUsers = async (req, res) => {
  res.send("All Users");
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

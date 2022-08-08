const tokenUser = (user) => {
  return {
    username: user.username,
    userId: user._id,
    email: user.email,
    age: user.age,
    role: user.role,
    followers: user.followers,
    following: user.following,
  };
};

module.exports = tokenUser;

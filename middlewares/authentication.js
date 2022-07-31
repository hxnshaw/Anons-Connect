const CustomError = require("../errors");
const { isValidToken } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new CustomError.UnauthenticatedError("INVALID AUTHENTICATION");
  }
  try {
    const { username, userId, role, email } = isValidToken({ token });
    req.user = { username, userId, role, email };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("INVALID AUTHENTICATION");
  }
};

module.exports = authenticateUser;

const CustomError = require("../errors");
const { isValidToken } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new CustomError.UnauthenticatedError("INVALID AUTHENTICATION");
  }
  try {
    const { username, userId, role, email, followers, following } =
      isValidToken({ token });
    req.user = { username, role, userId, email, followers, following };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("INVALID AUTHENTICATION");
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "UNAUTHORIZED TO ACCESS THIS ROUTE."
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };

const User = require("../models/User");

module.exports = function requireRoles (roles = []) {
  return (req, res, next) => {
    const { user } = req;

    // check if user exists and has the required role
    if (!user || !roles.includes(user.role)) {
      return res.status(403).send({ message: "Access forbidden: Insufficient role" });
    }

    next();
  };
};

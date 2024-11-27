const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Hash = require("../utils/hash");

class Authenticator {
  async authenticate(email, password) {
    const user = await User.scope("withPassword").findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw { error: ["Invalid email or password"] };
    }
  
    // generate JWT
    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
    });
  
    return {
      accessToken,
    };
  }
  
  async create({ name, email, password, role = "USER" }) {
    try {
      const user = await User.create({
        name,
        email,
        password: await Hash.hash(password), // hash password before storing
        role, // set the user role
      });
  
      return user;
    } catch (error) {
      console.error("Error in authenticator.create:", error);
      throw error;
    }
  }
}

module.exports = new Authenticator();

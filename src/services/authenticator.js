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
  
  async create(body) {
    
    const user = await User.create({
      email: body?.email,
      name: body?.name,
      password: await Hash.hash(body?.password), // hash password before storing
    });

    return user;
  }
}

module.exports = new Authenticator();

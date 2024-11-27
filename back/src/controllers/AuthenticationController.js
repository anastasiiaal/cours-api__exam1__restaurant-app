const { Router } = require("express");

const authenticator = require("../services/authenticator");
const User = require("../models/User");

/**
 * @param {Express.Application} app
 * @param {Router} router
 */
module.exports = function (app, router) {
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      if (!email || !password) {
        return res.status(400).send({ error: "Email and password are required" });
      }

      const token = await authenticator.authenticate(email, password);

      res.status(200).send(token);
    } catch (error) {
      console.error(error);

      if (error.error) {
        return res.status(400).send(error);
      }

      res.status(500).send({ error: "Internal Server Error" });
    }
  });


  router.post("/register", async (req, res) => {
    try {
      const { email, name, password } = req.body;
  
      if (!email || !name || !password) {
        return res.status(400).send({ message: "All fields are required" });
      }

      const user = await authenticator.create(req.body);

      const { accessToken } = await authenticator.authenticate(user.email, password);

      return res.status(201).send({ accessToken });
    } catch (e) {
      console.error("Register error:", e);
  
      if (e.name === "SequelizeUniqueConstraintError") {
        return res.status(400).send({ message: "Email already taken" });
      }
  
      return res.status(500).send({ message: "Internal Server Error" });
    }
  });
};

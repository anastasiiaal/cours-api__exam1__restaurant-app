require("dotenv").config();
require("./src/utils/sequelize");
require("express-async-errors");

const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const app = express();
const server = http.createServer(app);
const router = express.Router();
const cors = require("cors");

const requireAuth = require("./src/middlewares/require-auth");
const requireRole = require("./src/middlewares/require-role");

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:5173"
  })
);

app.use(bodyParser.json());
app.use("/api", router);

// add all model relations
require('./src/models/index.js');
require("./src/controllers")(app, router);

// admin routes (use requireAuth and requireRole to restrict access to admins)
const AdminController = require("./src/controllers/AdminController");
router.use("/admin", requireAuth, requireRole(["ADMIN"]), AdminController);

// error handling middleware
app.use((error, req, res, next) => {
  console.log(error.status);
  if (error?.status) {
    res.status(error?.status).send({
      code: error?.code,
      message: error?.message,
    });
  } else {
    res.status(500).send({
      code: "SERVER_ERRROR",
      message: "Internal Server Error",
    });
  }
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Api listening at http://localhost:${process.env.APP_PORT}`);
});

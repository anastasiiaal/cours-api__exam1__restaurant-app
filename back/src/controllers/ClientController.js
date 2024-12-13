const express = require("express");
const router = express.Router();
const ClientHandlers = require("../handlers/ClientHandlers");

// Fetch all restaurants for the user
router.get("/restaurants", ClientHandlers.getAllRestaurants);

module.exports = router;
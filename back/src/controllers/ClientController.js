const express = require("express");
const router = express.Router();
const ClientHandlers = require("../handlers/ClientHandlers");

// Fetch all restaurants for the user
router.get("/restaurants", ClientHandlers.getAllRestaurants);
// fetch all data & dishes of a restaurant
router.get("/restaurants/:id", ClientHandlers.getRestaurantWithDishes);
// update personal data
router.post("/me", ClientHandlers.updatePersonalData);

module.exports = router;
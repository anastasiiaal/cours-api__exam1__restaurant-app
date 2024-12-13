const { Router } = require("express");
const AdminHandlers = require("../handlers/AdminHandlers");

const router = Router();

// get all restaurants
router.get("/restaurants", AdminHandlers.fetchAllRestaurants);
// create owner account + its restaurant
router.post("/create-owner", AdminHandlers.createOwnerWithRestaurant);

module.exports = router;

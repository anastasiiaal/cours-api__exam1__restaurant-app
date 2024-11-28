const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");

// Fetch all restaurants for the user
router.get("/restaurants", async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll({
            attributes: ["id", "name", "address", "zipCode", "city", "image"],
        });

        res.status(200).send({
            message: "Restaurants retrieved successfully",
            data: restaurants,
        });
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;

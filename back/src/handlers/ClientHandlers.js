const Restaurant = require("../models/Restaurant");
const Dish = require("../models/Dish");

// Fetch all restaurants for the user
async function getAllRestaurants(req, res) {
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
}

module.exports = {
    getAllRestaurants
};

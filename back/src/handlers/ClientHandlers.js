const Restaurant = require("../models/Restaurant");
const Dish = require("../models/Dish");

module.exports = {
    // Fetch all restaurants for the user
    async getAllRestaurants(req, res) {
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
    },

    // fetch all data & dishes of a restaurant
    async getRestaurantWithDishes(req, res) {
        const { id } = req.params;

        try {
            const restaurant = await Restaurant.findOne({
                where: { id },
                attributes: ["id", "name", "address", "zipCode", "city", "image"],
                include: {
                    model: Dish,
                    attributes: ["id", "name", "image", "price", "description"],
                },
            });

            if (!restaurant) {
                return res.status(404).send({
                    message: "Restaurant not found",
                });
            }

            res.status(200).send({
                message: "Restaurant and dishes retrieved successfully",
                data: restaurant,
            });
        } catch (error) {
            console.error("Error fetching restaurant with dishes:", error);
            res.status(500).send({ message: "Internal Server Error" });
        }
    }
}

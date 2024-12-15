const Restaurant = require("../models/Restaurant");
const Dish = require("../models/Dish");
const User = require("../models/User");

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
    },

    // update account data
    async updatePersonalData(req, res) {
        // fetch current user's ID from the authenticated token
        const userId = req.user.id;
        const { name, email, password } = req.body;
    
        try {
            if (!name && !email && !password) {
                return res.status(400).send({
                    message: "Please provide at least one field to update",
                });
            }

            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).send({
                    message: "User not found",
                });
            }

            // update fields only if provided
            if (name) user.name = name;
            if (email) user.email = email;
            if (password) user.password = await Hash.hash(password);

            await user.save();

            res.status(200).send({
                message: "Personal data updated successfully",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            });
        } catch (error) {
            console.error("Error updating personal data:", error);
            // handle unique constraint violation for email
            if (error.name === "SequelizeUniqueConstraintError") {
                return res.status(400).send({
                    message: "Email already exists",
                });
            }

            res.status(500).send({
                message: "Internal Server Error",
            });
        }
    }
}

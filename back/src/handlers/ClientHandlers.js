const Restaurant = require("../models/Restaurant");
const Dish = require("../models/Dish");
const User = require("../models/User");
const Order = require("../models/Order");

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
    },

    // create new order out of cart items
    async addNewOrder(req, res) {
        const { restaurantId, items, total } = req.body;

        try {
            if (!restaurantId || !items || !total) {
                return res.status(400).send({ message: "Missing required fields" });
            }

            // check that restaurant exists
            const restaurant = await Restaurant.findByPk(restaurantId);
            if (!restaurant) {
                return res.status(404).send({ message: "Restaurant not found" });
            }

            // create order
            const order = await Order.create({
                userId: req.user.id,
                restaurantId,
                items: JSON.stringify(items),
                total,
            });

            res.status(201).send({
                message: "Order created successfully",
                order,
            });
        } catch (error) {
            console.error("Error creating order:", error);
            res.status(500).send({ message: "Internal Server Error" });
        }
    }
}

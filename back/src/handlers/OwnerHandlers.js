const Restaurant = require("../models/Restaurant");
const Dish = require("../models/Dish");
const Order = require("../models/Order");
const User = require("../models/User");

module.exports = {
    // fetch restaurant details
    async fetchRestaurantDetails(req, res) {
        try {
            const restaurant = await Restaurant.findOne({
                where: { ownerId: req.user.id },
            });

            if (!restaurant) {
                return res.status(404).send({ message: "Restaurant not found" });
            }

            res.status(200).send(restaurant);
        } catch (error) {
            console.error("Error fetching restaurant details:", error);
            res.status(500).send({ message: "Internal Server Error" });
        }
    },

    // fetch all restaurant dishes
    async fetchRestaurantDishes(req, res) {
        try {
            const ownerId = req.user.id;

            const restaurant = await Restaurant.findOne({
                where: { ownerId },
            });

            if (!restaurant) {
                return res.status(404).send({ message: "Restaurant not found" });
            }

            const dishes = await Dish.findAll({
                where: { restaurantId: restaurant.id },
            });

            res.status(200).send(dishes);
        } catch (error) {
            console.error("Error fetching dishes:", error);
            res.status(500).send({ message: "Internal Server Error" });
        }
    },

    // create a new dish for the owner's restaurant
    async createNewDish(req, res) {
        const { name, image, price, description } = req.body;

        try {
            const restaurant = await Restaurant.findOne({
                where: { ownerId: req.user.id },
            });

            if (!restaurant) {
                return res.status(403).send({ message: "Access forbidden: no restaurant found" });
            }

            const dish = await Dish.create({
                name,
                image,
                price,
                description,
                restaurantId: restaurant.id,
            });

            res.status(201).send({ message: "Dish created successfully:", dish });
        } catch (error) {
            console.error("Error creating dish:", error);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    // get a specific dish (only if it belongs to the owner's restaurant)
    async fetchDishById(req, res) {
        const { id } = req.params;

        try {
            const dish = await Dish.findByPk(id, {
                include: {
                    model: Restaurant,
                    attributes: ["ownerId"],
                },
            });

            if (!dish) {
                return res.status(404).send({ message: "Dish not found" });
            }

            if (dish.Restaurant.ownerId !== req.user.id) {
                return res.status(403).send({ message: "Access forbidden: dish does not belong to your restaurant" });
            }

            res.status(200).send(dish);
        } catch (error) {
            console.error("Error fetching dish:", error);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    // fetch all restaurant orders
    async fetchRestaurantOrders(req, res) {
        try {
            // current user/owner
            const ownerId = req.user.id;

            const restaurant = await Restaurant.findOne({
                where: { ownerId },
            });

            if (!restaurant) {
                return res.status(404).send({ message: "Restaurant not found" });
            }

            // fetch all restaurant's orders
            const orders = await Order.findAll({
                where: { restaurantId: restaurant.id },
                include: [
                    {
                        model: User,
                        attributes: ["id", "name", "email"], // client details
                    },
                    /**
                     *  ⚠️  I do not include Dish here because i pass the JSON value 
                     *      in case item name/price changes so it does not affect the total price later
                     *      but this part could be decommented together with related association
                     *      in /src/models/index.js
                    */ 
                    // {
                    //     model: Dish,
                    //     through: { attributes: [] },
                    //     attributes: ["id", "name", "price", "image", "description"],
                    // },
                ],
                order: [["date", "DESC"]], // recent first
            });

            res.status(200).send({
                message: "Orders fetched successfully",
                data: orders,
            });
        } catch (error) {
            console.error("Error fetching restaurant orders:", error);
            res.status(500).send({ message: "Internal Server Error" });
        }
    },
};

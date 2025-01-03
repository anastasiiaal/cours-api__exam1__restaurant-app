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

    // update restaurant details
    async updateRestaurantDetails (req, res) {
        const { name, address, zipCode, city, image } = req.body;
        const ownerId = req.user.id;

        try {
            const restaurant = await Restaurant.findOne({ where: { ownerId } });

            if (!restaurant) {
                return res.status(404).send({ message: "Restaurant not found" });
            }

            // check if current user owns the restaurant
            if (restaurant.ownerId !== ownerId) {
                return res.status(403).send({
                    message: "You are not authorized to edit this restaurant",
                });
            }

            // update provided values
            if (name) restaurant.name = name;
            if (image) restaurant.image = image;
            if (address) restaurant.address = address;
            if (zipCode) restaurant.zipCode = zipCode;
            if (city) restaurant.city = city;

            // save the updated restaurant
            await restaurant.save();

            res.status(200).send({
                message: "Restaurant updated successfully",
                restaurant,
            });
        } catch (error) {
            console.error("Error updating restaurant:", error);
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

    // delete one dish
    async deleteDishById(req, res) {
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
    
            // check if current user owns the restaurant with this dish
            if (dish.Restaurant.ownerId !== req.user.id) {
                return res.status(403).send({ message: "Access forbidden" });
            }
    
            // delete the dish!
            await dish.destroy();
    
            res.status(200).send({ message: "Dish deleted successfully" });
        } catch (error) {
            console.error("Error deleting dish:", error);
            res.status(500).send({ message: "Internal Server Error" });
        }
    },

    // edit one dish
    async updateDishById(req, res) {
        const { id } = req.params;
        const { name, image, price, description } = req.body;
        const ownerId = req.user.id;

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

            // check if current user owns the restaurant with this dish
            if (dish.Restaurant.ownerId !== ownerId) {
                return res.status(403).send({
                    message: "You are not authorized to edit this dish",
                });
            }

            // update provided values
            if (name) dish.name = name;
            if (image) dish.image = image;
            if (price) dish.price = price;
            if (description) dish.description = description;

            // save the updated dish
            await dish.save();

            res.status(200).send({
                message: "Dish updated successfully",
                dish,
            });
        } catch (error) {
            console.error("Error updating dish:", error);
            res.status(500).send({ message: "Internal Server Error" });
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

    // delete specific order
    async deleteOrderById(req, res) {
        const { id } = req.params;
        const ownerId = req.user.id;
    
        try {
            // Fetch the order
            const order = await Order.findByPk(id, {
                include: {
                    model: Restaurant,
                    attributes: ["id", "ownerId"], // restaurant data to validate ownership
                },
            });
    
            // check if the order exists
            if (!order) {
                return res.status(404).send({ message: "Order not found" });
            }
    
            // check if the current user owns the restaurant related to the order
            if (order.Restaurant.ownerId !== ownerId) {
                return res.status(403).send({
                    message: "You are not authorized to delete this order",
                });
            }
    
            // delete the order
            await order.destroy();
    
            res.status(200).send({ message: "Order deleted successfully" });
        } catch (error) {
            console.error("Error deleting order:", error);
            res.status(500).send({ message: "Internal Server Error" });
        }
    }
};

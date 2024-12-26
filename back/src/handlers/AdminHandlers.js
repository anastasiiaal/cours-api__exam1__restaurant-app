const authenticator = require("../services/authenticator");
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");

module.exports = {
    // get all restaurants
    async fetchAllRestaurants(req, res) {
        try {
            const restaurants = await Restaurant.findAll({
                include: [
                    {
                        model: User,
                        as: "owner",
                        attributes: ["name", "email"], // fetch only name and email of owner
                    },
                ],
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

    // create owner account + its restaurant
    async createOwnerWithRestaurant(req, res) {
        const { name, email, password, restaurantName, address, zipCode, city, image } = req.body;

        try {
            if (!name || !email || !password) {
                return res.status(400).send({ message: "Name, email, and password are required" });
            }

            if (!restaurantName || !address || !zipCode || !city || !image) {
                return res.status(400).send({ message: "All restaurant fields are required" });
            }

            // create the OWNER user
            const ownerUser = await authenticator.create({
                name,
                email,
                password,
                role: "OWNER",
            });

            // create the restaurant for the OWNER
            const restaurant = await Restaurant.create({
                name: restaurantName,
                address,
                zipCode,
                city,
                image,
                ownerId: ownerUser.id,
            });

            res.status(201).send({
                message: "Owner and restaurant created successfully",
                user: {
                    id: ownerUser.id,
                    name: ownerUser.name,
                    email: ownerUser.email,
                    role: ownerUser.role,
                },
                restaurant: {
                    id: restaurant.id,
                    ownerId: restaurant.ownerId,
                    name: restaurant.name,
                    address: restaurant.address,
                    zipCode: restaurant.zipCode,
                    city: restaurant.city,
                    image: restaurant.image,
                },
            });
        } catch (error) {
            console.error("AdminController error:", error);

            if (error.name === "SequelizeUniqueConstraintError") {
                return res.status(400).send({ message: "Email already exists" });
            }

            res.status(500).send({ message: "Internal Server Error" });
        }
    },

    // deletes a restaurant and all its related data
    async deleteRestaurant(req, res) {
        const { id } = req.params;

        try {
            // Find the restaurant by ID
            const restaurant = await Restaurant.findByPk(id);

            if (!restaurant) {
                return res.status(404).send({ message: "Restaurant not found" });
            }

            // Check if the restaurant has an owner
            const owner = await User.findByPk(restaurant.ownerId);

            // Delete the restaurant (cascade deletes dishes and orders due to relations)
            await restaurant.destroy();

            // Delete the owner
            if (owner) {
                await owner.destroy();
            }

            res.status(200).send({ message: "Restaurant, owner, dishes, and orders deleted successfully" });
        } catch (error) {
            console.error("Error deleting restaurant:", error);
            res.status(500).send({ message: "Internal Server Error" });
        }
    },
};

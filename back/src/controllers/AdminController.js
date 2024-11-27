const { Router } = require("express");
const authenticator = require("../services/authenticator");
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
const requireRoles = require("../middlewares/require-role");

const router = Router();

// get all restaurants
router.get("/restaurants", async (req, res) => {
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
});

// create owner account + its restaurant
router.post("/create-owner", async (req, res) => {
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
});

module.exports = router;

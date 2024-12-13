const { Router } = require("express");
const Restaurant = require("../models/Restaurant");
const Dish = require("../models/Dish");
const Order = require("../models/Order");

const router = Router();

// fetch restaurant details
router.get("/restaurant", async (req, res) => {
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
});

// fetch all restaurant dishes
router.get("/dishes", async (req, res) => {
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
});


// create a new dish for owner's restaurant
router.post("/dish/new", async (req, res) => {
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
});

// get a specific dish (only if it belongs to the owner's restaurant)
router.get("/dish/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // Find the dish
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
        res.status(500).send({ message: "Internal server srror" });
    }
});

// fetch all restaurant orders
router.get("/orders", async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { restaurantId: req.user.restaurantId },
        });

        res.status(200).send(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;

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

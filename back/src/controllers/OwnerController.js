const { Router } = require("express");
const OwnerHandlers = require("../handlers/OwnerHandlers");

const router = Router();

// fetch restaurant details
router.get("/restaurant", OwnerHandlers.fetchRestaurantDetails);
// update restaurant details
router.patch("/restaurant", OwnerHandlers.updateRestaurantDetails);
// fetch all restaurant dishes
router.get("/dishes", OwnerHandlers.fetchRestaurantDishes);
// create a new dish for owner's restaurant
router.post("/dish/new", OwnerHandlers.createNewDish);
// get one dish details
router.get("/dish/:id", OwnerHandlers.fetchDishById);
// edit one dish
router.patch("/dish/:id", OwnerHandlers.updateDishById);
// delete one dish
router.delete("/dish/:id", OwnerHandlers.deleteDishById);
// fetch all restaurant orders
router.get("/orders", OwnerHandlers.fetchRestaurantOrders);
// delete specific order
router.delete("/orders/:id", OwnerHandlers.deleteOrderById);

module.exports = router;

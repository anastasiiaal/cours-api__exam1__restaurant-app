const User = require('./User')
const Restaurant = require('./Restaurant');
const Dish = require('./Dish');
const Order = require('./Order');

// relations between models
User.hasOne(Restaurant, { as: "restaurant", foreignKey: "ownerId", onDelete: "CASCADE" });
Restaurant.belongsTo(User, { as: "owner", foreignKey: "ownerId" });

Restaurant.hasMany(Dish, { foreignKey: "restaurantId", onDelete: "CASCADE" });
Dish.belongsTo(Restaurant, { foreignKey: "restaurantId" });

Restaurant.hasMany(Order, { foreignKey: "restaurantId", onDelete: "CASCADE" });
Order.belongsTo(Restaurant, { foreignKey: "restaurantId" });
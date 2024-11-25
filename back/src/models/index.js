const User = require('./User')
const Restaurant = require('./Restaurant');
const Dish = require('./Dish');
const Order = require('./Order');

// relations between models
User.hasOne(Restaurant, { foreignKey: "ownerId" });
Restaurant.belongsTo(User, { foreignKey: "ownerId" });

Restaurant.hasMany(Dish, { foreignKey: "restaurantId" });
Dish.belongsTo(Restaurant, { foreignKey: "restaurantId" });

Restaurant.hasMany(Order, { foreignKey: "restaurantId" });
Order.belongsTo(Restaurant, { foreignKey: "restaurantId" });
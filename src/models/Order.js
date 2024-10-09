const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");
const Restaurant = require("./Restaurant"); // Import the Restaurant model

const Order = sequelize.define("Order", {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    references: {
      model: Restaurant,
      key: "id",
    },
    allowNull: false,
  },
});

module.exports = Order;

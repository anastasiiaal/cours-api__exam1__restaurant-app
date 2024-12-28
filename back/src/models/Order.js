const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");
const Restaurant = require("./Restaurant"); // Import the Restaurant model
const User = require("./User");

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
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
    allowNull: false,
  },
  items: {
    type: DataTypes.TEXT, // just save string value
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Order;

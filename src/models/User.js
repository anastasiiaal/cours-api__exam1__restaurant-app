/* const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      required: true,
      default: "USER",
    },
  },
  { timestamps: true }
);
Schema.methods.toJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    firstName: this.firstName,
    role: this.role,
  };
};

module.exports = mongoose.model("User", Schema); */

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM(["USER", "ADMIN"]),
      allowNull: false,
      defaultValue: "USER",
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ["password"] }, // Par défaut, on exclut le mot de passe
    },
    scopes: {
      withPassword: { attributes: {} }, // Utilise ce scope si tu as besoin du mot de passe
    },
  }
);

module.exports = User;

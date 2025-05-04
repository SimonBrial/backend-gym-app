import { DataTypes } from "sequelize";
import sequelize from "../db";

export const AmountModel = sequelize.define(
  "amount",
  {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
  },
  { timestamps: true },
);

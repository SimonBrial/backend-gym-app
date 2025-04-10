import { DataTypes } from "sequelize";
import sequelize from "../db";

export const AmountSchema = sequelize.define(
  "amount",
  {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
  },
  { timestamps: true },
);

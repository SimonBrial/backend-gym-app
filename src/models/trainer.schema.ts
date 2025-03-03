import { DataTypes } from "sequelize";
import sequelize from "../db";

export const TrainerSchema = sequelize.define(
  "trainer",
  {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    trainer_dni: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    area: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "No indicado",
    },
    clients_dni: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true },
);

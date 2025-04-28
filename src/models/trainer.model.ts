import { DataTypes } from "sequelize";
import sequelize from "../db";

export const TrainerModel = sequelize.define(
  "trainer",
  {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    trainerDni: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    lastName: {
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
    assignedClients: {
      type: DataTypes.ARRAY(DataTypes.STRING()),
      allowNull: true,
      defaultValue: [],
    },
  },
  { timestamps: true },
);

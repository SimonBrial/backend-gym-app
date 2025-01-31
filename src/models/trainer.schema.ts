import { DataTypes } from "sequelize";
import sequelize from "../db";

export const TrainerSchema = sequelize.define("trainer", {
  trainer_id: {
    type: DataTypes.UUIDV4,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  dni: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  area: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "No indicado",
  },
  clients_dni: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

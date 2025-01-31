import { DataTypes } from "sequelize";
import sequelize from "../db";

export const InvoiceSchema = sequelize.define("invoice", {
  invoice_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  dni: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  client_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  client_last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  trainer_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  trainer_name: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: "No asignado",
  },
  first_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  last_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  client_dni: {
    type: DataTypes.UUIDV4,
    allowNull: true,
  },
});

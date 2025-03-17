import { DataTypes } from "sequelize";
import sequelize from "../db";

export const InvoiceSchema = sequelize.define(
  "invoice",
  {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    invoice_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    client_dni: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    client_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    client_last_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    /* trainer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }, */
    trainer_dni: {
      type: DataTypes.STRING, // The length of the DNI should be define
      allowNull: true,
      unique: true,
      defaultValue: "No asignado",
    },
    trainer_name: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "No asignado",
    },
    trainer_last_name: {
      type: DataTypes.STRING(20),
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
    plan: {
      type: DataTypes.ENUM("monthly", "weekly", "daily"),
      allowNull: false,
    },
  },
  { timestamps: true },
);

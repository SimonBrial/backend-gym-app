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
    invoiceId: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    userDni: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    userLastName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    /* trainer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }, */
    trainerDni: {
      type: DataTypes.STRING(50), // The length of the DNI should be define
      allowNull: true,
      unique: false,
      defaultValue: "No asignado",
    },
    trainerName: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: "No asignado",
    },
    trainerLastName: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: "No asignado",
    },
    firstDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    lastDate: {
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

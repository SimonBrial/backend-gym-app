import { DataTypes } from "sequelize";
import sequelize from "../db";

export const InvoiceModel = sequelize.define(
  "invoice",
  {
    _id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    invoiceId: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true, // Garantiza que sea único
      validate: {
        notEmpty: true, // No permite valores vacíos
      },
    },
    userDni: {
      type: DataTypes.STRING(10),
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
    direction: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "Direccion no asignada",
    },
    phoneNumber: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: "Telefono no asignado",
    },
    email: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "Correo no asignado",
    },
    minExchangeDollarValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    averageValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    maxExchangeDollarValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    paymentMethod: {
      type: DataTypes.ENUM("contado", "bolivares"),
      allowNull: false,
      defaultValue: "contado",
    },
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
    comments: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "",
    },
  },
  { timestamps: true },
);

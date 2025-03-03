import { DataTypes } from "sequelize";
import sequelize from "../db";

const dt = new Date();

export const UserSchema = sequelize.define(
  "user",
  {
    _id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_dni: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    plan: {
      type: DataTypes.ENUM("monthly", "weekly", "daily"),
      allowNull: false,
    },
    registration_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: dt.toISOString(),
    },
    last_payment: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    days_of_debt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    trainer_id: {
      // Id  from the DDBB
      type: DataTypes.STRING(6),
      allowNull: true,
      // unique: true,
      defaultValue: "000000",
    },
    trainer_dni: {
      type: DataTypes.STRING(10), // The length of the DNI should be define
      allowNull: true,
      // unique: true,
      defaultValue: "No asignado",
    },
    trainer_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "No asignado",
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: dt.toISOString(),
    },
    invoices_id: {
      type: DataTypes.ARRAY(DataTypes.STRING()),
      allowNull: true,
      defaultValue: [],
    },
  },
  { timestamps: true },
);

// UserSchema.belongsTo(TrainerSchema, { foreignKey: "trainer_id" });
// UserSchema.hasMany(InvoiceSchema, { foreignKey: "user_id" });

import { DataTypes } from "sequelize";
import sequelize from "../db";

export const UserSchema = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
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
    registration_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
      type: DataTypes.UUID,
      allowNull: true,
    },
    trainer_name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "No asignado"
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    invoices_id: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  { timestamps: true },
);

// UserSchema.belongsTo(TrainerSchema, { foreignKey: "trainer_id" });
// UserSchema.hasMany(InvoiceSchema, { foreignKey: "user_id" });

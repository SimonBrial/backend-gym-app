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
    userDni: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    lastName: {
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
    registrationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: dt.toISOString(),
    },
    lastPayment: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    daysOfDebt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    trainerId: {
      // Id  from the DDBB
      type: DataTypes.STRING(6),
      allowNull: true,
      // unique: true,
      defaultValue: "000000",
    },
    trainerDni: {
      type: DataTypes.STRING(10), // The length of the DNI should be define
      allowNull: true,
      // unique: true,
      defaultValue: "No asignado",
    },
    trainerName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "No asignado",
    },
    lastUpdate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: dt.toISOString(),
    },
    invoicesArray: {
      type: DataTypes.ARRAY(DataTypes.STRING()),
      allowNull: true,
      defaultValue: [],
    },
  },
  { timestamps: true },
);

// UserSchema.belongsTo(TrainerSchema, { foreignKey: "trainer_id" });
// UserSchema.hasMany(InvoiceSchema, { foreignKey: "user_id" });

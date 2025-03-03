"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
const dt = new Date();
exports.UserSchema = db_1.default.define("user", {
    _id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_dni: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false,
        unique: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
    weight: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    plan: {
        type: sequelize_1.DataTypes.ENUM("monthly", "weekly", "daily"),
        allowNull: false,
    },
    registration_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: dt.toISOString(),
    },
    last_payment: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    days_of_debt: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    trainer_id: {
        // Id  from the DDBB
        type: sequelize_1.DataTypes.STRING(6),
        allowNull: true,
        // unique: true,
        defaultValue: "000000",
    },
    trainer_dni: {
        type: sequelize_1.DataTypes.STRING(10), // The length of the DNI should be define
        allowNull: true,
        // unique: true,
        defaultValue: "No asignado",
    },
    trainer_name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "No asignado",
    },
    last_update: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: dt.toISOString(),
    },
    invoices_id: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING()),
        allowNull: true,
        defaultValue: [],
    },
}, { timestamps: true });
// UserSchema.belongsTo(TrainerSchema, { foreignKey: "trainer_id" });
// UserSchema.hasMany(InvoiceSchema, { foreignKey: "user_id" });
//# sourceMappingURL=user.schema.js.map
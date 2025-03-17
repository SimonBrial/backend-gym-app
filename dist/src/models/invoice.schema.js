"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceSchema = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
exports.InvoiceSchema = db_1.default.define("invoice", {
    _id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    invoice_id: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    },
    client_dni: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false,
    },
    client_name: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
    client_last_name: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
    /* trainer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }, */
    trainer_dni: {
        type: sequelize_1.DataTypes.STRING, // The length of the DNI should be define
        allowNull: true,
        unique: true,
        defaultValue: "No asignado",
    },
    trainer_name: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
        defaultValue: "No asignado",
    },
    trainer_last_name: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
        defaultValue: "No asignado",
    },
    first_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    last_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    amount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    plan: {
        type: sequelize_1.DataTypes.ENUM("monthly", "weekly", "daily"),
        allowNull: false,
    },
}, { timestamps: true });
//# sourceMappingURL=invoice.schema.js.map
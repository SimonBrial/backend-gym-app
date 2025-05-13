"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceModel = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
exports.InvoiceModel = db_1.default.define("invoice", {
    _id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    invoiceId: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false,
        unique: true, // Garantiza que sea único
        validate: {
            notEmpty: true, // No permite valores vacíos
        },
    },
    userDni: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
    },
    userName: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
    userLastName: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
    direction: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "Direccion no asignada",
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false,
        defaultValue: "Telefono no asignado",
    },
    email: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "Correo no asignado",
    },
    minExchangeDollarValue: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    averageValue: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    maxExchangeDollarValue: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    paymentMethod: {
        type: sequelize_1.DataTypes.ENUM("contado", "bolivares"),
        allowNull: false,
        defaultValue: "contado",
    },
    trainerDni: {
        type: sequelize_1.DataTypes.STRING(50), // The length of the DNI should be define
        allowNull: true,
        unique: false,
        defaultValue: "No asignado",
    },
    trainerName: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: true,
        defaultValue: "No asignado",
    },
    trainerLastName: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: true,
        defaultValue: "No asignado",
    },
    firstDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    lastDate: {
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
    comments: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
        defaultValue: "",
    },
}, { timestamps: true });
//# sourceMappingURL=invoice.model.js.map
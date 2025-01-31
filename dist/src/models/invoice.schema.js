"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceSchema = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
exports.InvoiceSchema = db_1.default.define("invoice", {
    invoice_id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    dni: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    client_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    client_last_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    trainer_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    trainer_name: {
        type: sequelize_1.DataTypes.INTEGER,
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
    client_dni: {
        type: sequelize_1.DataTypes.UUIDV4,
        allowNull: true,
    },
});
//# sourceMappingURL=invoice.schema.js.map
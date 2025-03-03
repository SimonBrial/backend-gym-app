"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainerSchema = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
exports.TrainerSchema = db_1.default.define("trainer", {
    _id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    trainer_dni: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    area: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
        defaultValue: "No indicado",
    },
    clients_dni: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, { timestamps: true });
//# sourceMappingURL=trainer.schema.js.map
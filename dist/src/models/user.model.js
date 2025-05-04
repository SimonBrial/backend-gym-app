"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
const dt = new Date();
exports.UserModel = db_1.default.define("user", {
    _id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userDni: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false,
        unique: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
    lastName: {
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
    registrationDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: dt.toISOString(),
    },
    lastPayment: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    daysOfDebt: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    trainerId: {
        // Id  from the DDBB
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        // unique: true,
        defaultValue: 0,
    },
    trainerDni: {
        type: sequelize_1.DataTypes.STRING(10), // The length of the DNI should be define
        allowNull: true,
        // unique: true,
        defaultValue: "No asignado",
    },
    trainerName: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "No asignado",
    },
    lastUpdate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: dt.toISOString(),
    },
    invoicesArray: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING()),
        allowNull: true,
        defaultValue: [],
    },
}, { timestamps: true });
// UserModel.belongsTo(TrainerModel, { foreignKey: "trainer_id" });
// UserModel.hasMany(InvoiceModel, { foreignKey: "user_id" });
//# sourceMappingURL=user.model.js.map
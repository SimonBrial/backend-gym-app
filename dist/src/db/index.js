"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const { DB_HOST, DB_PASSWORD, DB_PORT, DB_USER, DB_TYPE, DB_NAME } = config_1.default;
const connectionString = `${DB_TYPE}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const sequelize = new sequelize_1.Sequelize(connectionString);
exports.default = sequelize;
//# sourceMappingURL=index.js.map
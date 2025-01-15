"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const getEnvVariable = (key) => {
    const value = process.env[key];
    if (value === undefined) {
        throw new Error(`Environment variable ${key} is not set.`);
    }
    return value;
};
const config = {
    DB_PORT: parseInt(getEnvVariable("DB_PORT"), 10),
    PORT: parseInt(getEnvVariable("PORT"), 10) || 3000,
    DB_PASSWORD: getEnvVariable("DB_PASSWORD"),
    DB_HOST: getEnvVariable("DB_HOST"),
    DB_NAME: getEnvVariable("DB_NAME"),
    DB_USER: getEnvVariable("DB_USER"),
    DB_TYPE: getEnvVariable("DB_TYPE"),
};
exports.default = config;
//# sourceMappingURL=config.js.map
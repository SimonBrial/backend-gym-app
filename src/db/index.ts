import { Sequelize } from "sequelize";
import config from "../config/config";

const { DB_HOST, DB_PASSWORD, DB_PORT, DB_USER, DB_TYPE, DB_NAME } = config;

const connectionString: string = `${DB_TYPE}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const sequelize = new Sequelize(connectionString);

export default sequelize;

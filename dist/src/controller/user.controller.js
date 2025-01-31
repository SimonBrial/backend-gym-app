"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.pagination = exports.createUser = exports.deleteUsers = exports.updateUsers = exports.getUserById = void 0;
const user_schema_1 = require("../models/user.schema");
const ErrorHandler_1 = require("../helpers/ErrorHandler");
// Get all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const user = req.body.name;
        const users = yield user_schema_1.UserSchema.findAll();
        // No users found
        if (!users || users.length === 0) {
            console.log("Something went wrong");
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 404,
                message: "No se encontraron usuarios en la base de datos",
            }, res);
        }
        // Users found
        res.status(200).json({ message: "Usuarios encontrados", users });
    }
    catch (err) {
        (0, ErrorHandler_1.ErrorHandler)({
            statusCode: 400,
            message: "la solicitud no ha podido ser gestionada adecuadamente.",
        }, res);
    }
});
exports.getUsers = getUsers;
// Get user By Id
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        // If there is problem with the request
        if (!_id) {
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 400, message: "Problema con la solicitud" }, res);
        }
        // If there ins't any problem with the request
        const userFound = yield user_schema_1.UserSchema.findOne({
            where: { clientid: _id },
        });
        // No User found
        if (!userFound) {
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 404, message: "Usuario no encontrado" }, res);
        }
        // User found
        res.status(200).json({ user: userFound });
    }
    catch (err) {
        (0, ErrorHandler_1.ErrorHandler)({ statusCode: 500, message: "Ha ocurrido un error en el servidor" }, res);
    }
});
exports.getUserById = getUserById;
// Create user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_schema_1.UserSchema.findAll();
        if (!users || users.length === 0) {
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 404, message: "Algo ha pasado con la solicitud" }, res);
        }
        const { registration_date, days_of_debt, trainer_name, last_payment, last_updated, invoices_id, trainer_id, weight, name, dni, age, } = req.body;
        const user = {
            client_id: users.length + 1,
            registration_date,
            days_of_debt,
            trainer_name,
            last_payment,
            last_updated,
            invoices_id,
            trainer_id,
            weight,
            name,
            dni,
            age,
        };
        const data = yield user_schema_1.UserSchema.create({ user });
        res
            .sendStatus(201)
            .json({ message: "El usuario ha sido creado", user: data });
        // const user = res.json({ res: "Creating user" });
    }
    catch (err) {
        (0, ErrorHandler_1.ErrorHandler)({ statusCode: 500, message: "Ha ocurrido un error en el servidor" }, res);
    }
});
exports.createUser = createUser;
// Update user by Id
const deleteUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find user to delete
        const { _id } = req.params; // ID of user
        // if id doesn't exist
        if (!_id) {
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 404, message: "No fue suministrada un id de usuario" }, res);
        }
        // Id id exists
        const userToDelete = yield user_schema_1.UserSchema.findOne({
            where: { clientid: _id },
        });
        if (!userToDelete) {
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 404, message: "Usuario no encontrado" }, res);
        }
        yield userToDelete.destroy();
        res.json({ res: "Updating user" });
    }
    catch (err) {
        console.log(err);
    }
});
exports.deleteUsers = deleteUsers;
// Delete user by Id
const updateUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({ res: "Deleting user" });
    }
    catch (err) {
        console.log(err);
    }
});
exports.updateUsers = updateUsers;
// Get a quantity of users by a number (Pagination)
const pagination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({ res: "Pagination", qty: 20 });
    }
    catch (err) {
        console.log(err);
    }
});
exports.pagination = pagination;
//# sourceMappingURL=user.controller.js.map
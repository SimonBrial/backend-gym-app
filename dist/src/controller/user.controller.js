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
exports.getUsers = exports.pagination = exports.createUser = exports.deleteUser = exports.updateUser = exports.getUserById = void 0;
const user_schema_1 = require("../models/user.schema");
const ErrorHandler_1 = require("../helpers/ErrorHandler");
const invoiceDaysCalc_1 = require("../helpers/invoiceDaysCalc");
const invoice_schema_1 = require("../models/invoice.schema");
// READ all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const user = req.body.name;
        const users = (yield user_schema_1.UserSchema.findAll()).map((user) => user.toJSON());
        console.log("users: ", users);
        // No users found
        if (!users || users.length === 0) {
            console.log("DB empty!");
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 404,
                message: "No se encontraron usuarios en la base de datos",
            }, res);
        }
        // If user not null
        // Searching invoices
        const invoicesArray = (yield invoice_schema_1.InvoiceSchema.findAll()).map((inv) => inv.toJSON());
        const newData = users
            .map((user) => {
            const userInvoices = invoicesArray.filter((inv) => inv.userDni === user.userDni);
            return Object.assign(Object.assign({}, user), { invoicesArray: userInvoices });
        })
            .filter((data) => data !== undefined);
        const dataResponse = {
            status: "success",
            message: "Usuarios encontrados",
            data: newData,
        };
        // Users found
        res.status(200).json(dataResponse);
    }
    catch (err) {
        (0, ErrorHandler_1.ErrorHandler)({
            statusCode: 400,
            message: "la solicitud no ha podido ser gestionada adecuadamente.",
        }, res);
    }
});
exports.getUsers = getUsers;
// READ user By Id
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        // console.log("Received ID:", _id);
        const userId = parseInt(_id);
        // If there is problem with the request
        if (!userId || isNaN(userId)) {
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 400, message: "Problema con la solicitud" }, res);
        }
        // If there isn't any problem with the request
        const userFound = yield user_schema_1.UserSchema.findOne({
            where: { _id: userId },
        });
        // if User not found
        if (!userFound) {
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 404, message: "Usuario no encontrado" }, res);
        }
        // User found
        const dataResponse = {
            status: "success",
            message: "Usuario encontrado",
            data: userFound,
        };
        res.status(200).json(dataResponse);
    }
    catch (err) {
        (0, ErrorHandler_1.ErrorHandler)({ statusCode: 500, message: "Ha ocurrido un error en el servidor" }, res);
    }
});
exports.getUserById = getUserById;
// CREATE user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO: Verify if the req.body don't empty.
        // TODO: Verify if the user hasn't been created yet. The DNI should be used for that validation.
        const userToCreate = req.body;
        if (!userToCreate) {
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 400, message: "El cuerpo de la solicitud está vacío" }, res);
        }
        const { invoicesArray, trainerDni, trainerId, lastName, userDni, weight, plan, name, age, } = req.body;
        const sameUsers = (yield user_schema_1.UserSchema.findAll({ where: { userDni } })).map((user) => user.toJSON());
        if (sameUsers && sameUsers.length > 0) {
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 409, message: "Ya existe un usuario con ese DNI" }, res);
        }
        const totalUsers = yield user_schema_1.UserSchema.findAll();
        const user = {
            _id: totalUsers.length + 1,
            userDni,
            name,
            lastName,
            age,
            weight,
            trainerId,
            trainerDni,
            plan,
            registrationDate: new Date(),
            lastPayment: new Date(),
            lastUpdate: new Date(),
            daysOfDebt: 0,
            trainerName: "",
            invoicesArray: [""],
            // createdAt: new Date(),
            // updatedAt: new Date(),
        };
        const data = yield user_schema_1.UserSchema.create(user);
        console.log("---> data:", data);
        if (!data) {
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 400,
                message: "Hubo un problema para crear el registro.",
            }, res);
        }
        // On these place i will add the code to create the first invoice for the user.
        const totalInvoices = (yield invoice_schema_1.InvoiceSchema.findAll()).map((invoice) => invoice.toJSON());
        const invoiceDays = (0, invoiceDaysCalc_1.invoiceDaysCalculator)(plan);
        if (typeof invoiceDays === "string") {
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 400,
                message: "El plan del usuario es inválido.",
            }, res);
        }
        const { firstDay, lastDay } = invoiceDays;
        const firstInvoice = {
            _id: totalInvoices.length + 1, // Genera un ID único para la factura.
            userLastName: lastName,
            trainerDni,
            invoiceId: crypto.randomUUID(),
            firstDate: firstDay,
            userName: name,
            lastDate: lastDay,
            userDni,
            amount: 100, // TODO --> Ajusta el monto según el plan.
            plan,
        };
        const createdInvoice = yield invoice_schema_1.InvoiceSchema.create(firstInvoice);
        if (!createdInvoice) {
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 400,
                message: "Hubo un problema para crear la primera factura.",
            }, res);
        }
        // Asegúrate de que invoicesArray sea un array
        if (!Array.isArray(data.dataValues.invoicesArray)) {
            data.dataValues.invoicesArray = [];
        }
        // Agrega el ID de la factura y filtra valores vacíos
        data.dataValues.invoicesArray = [
            ...data.dataValues.invoicesArray,
            createdInvoice.dataValues.invoiceId,
        ].filter((inv) => inv !== "");
        yield data.update({ invoicesArray: data.dataValues.invoicesArray }, { where: { userDni } });
        yield data.save();
        const dataUpdated = Object.assign(Object.assign({}, data.toJSON()), { invoicesArray: createdInvoice.toJSON() });
        const dataResponse = {
            status: "success",
            message: "El usuario ha sido creado satisfactoriamente!",
            data: dataUpdated,
        };
        // Process Complete to create a new user.
        res.status(201).json(dataResponse);
        // const user = res.json({ res: "Creating user" });
    }
    catch (err) {
        (0, ErrorHandler_1.ErrorHandler)({ statusCode: 500, message: "Ha ocurrido un error en el servidor" }, res);
        console.log("Error:", err);
    }
});
exports.createUser = createUser;
// DELETE user by Id
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Receive the Id of the user to delete
        const { _id } = req.params; // ID of user
        // if id don't exist
        if (!_id || !parseInt(_id)) {
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 404, message: "No fue suministrada un id de usuario" }, res);
        }
        // If id exists
        const userId = parseInt(_id);
        const userToDelete = yield user_schema_1.UserSchema.findOne({
            where: { _id: userId },
        });
        if (!userToDelete) {
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 404, message: "Usuario no encontrado" }, res);
        }
        yield userToDelete.destroy();
        const dataResponse = {
            status: "success",
            message: "El usuario ha sido eliminado satisfactoriamente",
            data: null,
        };
        res.status(200).json(dataResponse);
    }
    catch (err) {
        console.log(err);
    }
});
exports.deleteUser = deleteUser;
// UPDATE user by Id
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO: Read ID from request and body.
        const { _id } = req.params;
        if (!_id || !req.body) {
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 404, message: "Problemas con la solicitud." }, res);
        }
        const userId = parseInt(_id);
        // TODO: Search user by ID
        const userFound = yield user_schema_1.UserSchema.findOne({ where: { _id: userId } });
        console.log("userFound: ", userFound);
        // TODO: Confirm that the user exist, if do not exist, then send message.
        if (!userFound) {
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 404, message: "Usuario no encontrado" }, res);
        }
        // TODO: If user existing then, update the user data.
        const { registrationDate, trainerName, lastPayment, daysOfDebt, trainerDni, lastUpdate, invoicesArray, trainerId, lastName, userDni, weight, name, plan, age, } = req.body;
        console.log("req.body: ", req.body);
        // user.registrationDate  user.lastPayment  user.daysOfDebt  user.last_update
        const userUpdated /* : UserBody */ = {
            _id: _id,
            registrationDate,
            trainerName,
            lastPayment,
            daysOfDebt,
            trainerDni,
            lastUpdate,
            invoicesArray,
            trainerId,
            lastName,
            userDni,
            weight,
            name,
            plan,
            age,
        };
        // TODO: if data has been updated, then the API will send a success message.
        userFound.set(userUpdated);
        yield userFound.save();
        const dataResponse = {
            status: "success",
            message: "el usuario ha sido actualizado satisfactoriamente!",
            data: null,
        };
        res.status(200).json(dataResponse);
    }
    catch (err) {
        console.log(err);
    }
});
exports.updateUser = updateUser;
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
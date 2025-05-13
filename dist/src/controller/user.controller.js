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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.pagination = exports.createUser = exports.deleteUser = exports.updateUser = exports.getUserById = void 0;
const user_model_1 = require("../models/user.model");
const ErrorHandler_1 = require("../helpers/ErrorHandler");
const invoiceDaysCalc_1 = require("../helpers/invoiceDaysCalc");
const invoice_model_1 = require("../models/invoice.model");
const db_1 = __importDefault(require("../db"));
const fillWithZeros_1 = require("../helpers/fillWithZeros");
const amount_model_1 = require("../models/amount.model");
const getDollarValue_1 = require("../helpers/getDollarValue");
// READ all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const user = req.body.name;
        const users = (yield user_model_1.UserModel.findAll()).map((user) => user.toJSON());
        console.log("users: ", users);
        // No users found
        if (!users || users.length === 0) {
            console.log("DB empty!");
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 404,
                message: "No se encontraron usuarios en la base de datos",
            }, res);
        }
        // If user not null Searching invoices
        const invoicesArray = (yield invoice_model_1.InvoiceModel.findAll()).map((inv) => inv.toJSON());
        console.log("invoicesArray: ", invoicesArray);
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
            message: "La solicitud no ha podido ser gestionada adecuadamente.",
        }, res);
    }
});
exports.getUsers = getUsers;
// READ user By Id
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const transaction = yield db_1.default.transaction();
    try {
        const { _id } = req.params;
        // console.log("Received ID:", _id);
        // If there is problem with the request
        if (!_id) {
            yield transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 400,
                message: "Problema con la solicitud",
            }, res);
        }
        const userId = parseInt(_id);
        // If there isn't any problem with the request
        const userFound = (_a = (yield user_model_1.UserModel.findOne({
            where: {
                _id: userId,
            },
            transaction,
        }))) === null || _a === void 0 ? void 0 : _a.toJSON();
        // if User not found
        if (!userFound) {
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 404,
                message: "Usuario no encontrado",
            }, res);
        }
        // Searching invoices
        const invoicesArray = (yield invoice_model_1.InvoiceModel.findAll({
            where: {
                _id: userId,
            },
            transaction,
        })).map((inv) => inv.toJSON());
        yield transaction.commit();
        const newData = Object.assign(Object.assign({}, userFound), { invoicesArray: invoicesArray });
        // console.log("newData: ", newData);
        /* users
          .map((user) => {
            const userInvoices = invoicesArray.filter(
              (inv) => inv.userDni === user.userDni,
            );
            return {
              ...user,
              invoicesArray: userInvoices,
            };
          })
          .filter((data: any) => data !== undefined); */
        // User found
        const dataResponse = {
            status: "success",
            message: "Usuario encontrado",
            data: newData,
        };
        res.status(200).json(dataResponse);
    }
    catch (err) {
        yield transaction.rollback();
        return (0, ErrorHandler_1.ErrorHandler)({
            statusCode: 500,
            message: "Ha ocurrido un error en el servidor",
        }, res);
    }
});
exports.getUserById = getUserById;
// CREATE user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const transaction = yield db_1.default.transaction();
    try {
        // TODO: Verify if the req.body don't empty.
        // TODO: Verify if the user hasn't been created yet. The DNI should be used for
        // that validation.
        if (!req.body) {
            yield transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 400, message: "El cuerpo de la solicitud está vacío" }, res);
        }
        const { paymentMethod, phoneNumber, trainerName, trainerDni, direction, trainerId, lastName, userDni, comments, weight, email, plan, name, age, } = req.body;
        const sameUsers = yield user_model_1.UserModel.findOne({
            where: { userDni },
            transaction,
        });
        /* const totalUsers = allUsers.length;
        const sameUsers: UserBody[] = allUsers.filter(
          (user: UserBody) => user.userDni === userDni,
        ); */
        if (sameUsers) {
            yield transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 409, message: "Ya existe un usuario con ese DNI" }, res);
        }
        const newUser = {
            // _id: totalUsers + 1, <-- It´s automacally
            phoneNumber,
            trainerDni,
            trainerId,
            direction,
            lastName,
            userDni,
            weight,
            email,
            plan,
            name,
            age,
            trainerName: trainerName ? trainerName : "No asignado",
            registrationDate: new Date(),
            lastPayment: new Date(),
            lastUpdate: new Date(),
            invoicesArray: [""],
            daysOfDebt: 0,
        };
        const userToCreated = yield user_model_1.UserModel.create(newUser, { transaction });
        console.log("---> userToCreated:", userToCreated);
        if (!userToCreated) {
            yield transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 400,
                message: "Hubo un problema para crear el registro.",
            }, res);
        }
        // On these place i will add the code to create the first invoice for the user.
        const totalInvoices = yield invoice_model_1.InvoiceModel.count({ transaction });
        const invoiceDays = (0, invoiceDaysCalc_1.invoiceDaysCalculator)(plan);
        if (typeof invoiceDays === "string") {
            yield transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 400,
                message: "El plan del usuario es inválido.",
            }, res);
        }
        const planSelected = (_a = (yield amount_model_1.AmountModel.findOne({
            where: { name: plan },
            transaction,
        }))) === null || _a === void 0 ? void 0 : _a.toJSON();
        console.log("planSelected --> ", planSelected);
        if (planSelected === undefined) {
            yield transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 400,
                message: "No existe el plan seleccionado, por favor indicar otro.",
            }, res);
        }
        console.log("planSelected --> ", planSelected);
        const { firstDay, lastDay } = invoiceDays;
        const { monitors } = yield (0, getDollarValue_1.getDollarValue)();
        const firstInvoice = {
            // _id: totalInvoices + 1, // Genera un ID único para la factura.
            userLastName: lastName,
            trainerDni,
            invoiceId: (0, fillWithZeros_1.fillWithZeros)(totalInvoices + 1, 11),
            firstDate: firstDay,
            userName: name,
            lastDate: lastDay,
            userDni,
            amount: planSelected.cost, // TODO --> Ajusta el monto según el plan.
            plan,
            direction,
            phoneNumber,
            email,
            averageValue: (monitors.enparalelovzla.price + monitors.bcv.price) / 2,
            minExchangeDollarValue: monitors.bcv.price,
            maxExchangeDollarValue: monitors.enparalelovzla.price,
            paymentMethod,
            comments,
            trainerName: trainerName ? trainerName : "No asignado",
        };
        const createdInvoice = yield invoice_model_1.InvoiceModel.create(firstInvoice, {
            transaction,
        });
        if (!createdInvoice) {
            yield transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 400,
                message: "Hubo un problema para crear la primera factura.",
            }, res);
        }
        // Asegúrate de que invoicesArray sea un array
        if (!Array.isArray(userToCreated.dataValues.invoicesArray)) {
            userToCreated.dataValues.invoicesArray = [];
        }
        // Agrega el ID de la factura y filtra valores vacíos
        userToCreated.dataValues.invoicesArray = [
            ...userToCreated.dataValues.invoicesArray.filter((inv) => typeof inv === "object"),
            createdInvoice.toJSON(),
        ];
        // userToCreated.dataValues.invoicesArray.push(invoiceData);
        yield userToCreated.update({ invoicesArray: userToCreated.dataValues.invoicesArray }, { where: { userDni }, transaction });
        yield transaction.commit();
        const dataUpdated = Object.assign(Object.assign({}, userToCreated.toJSON()), { invoicesArray: [...userToCreated.toJSON().invoicesArray] });
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
        yield transaction.rollback();
        (0, ErrorHandler_1.ErrorHandler)({
            statusCode: 500,
            message: "Ha ocurrido un error en el servidor",
        }, res);
        console.log("Error:", err);
    }
});
exports.createUser = createUser;
// UPDATE user by Id
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield db_1.default.transaction();
    try {
        // TODO: Read ID from request and body.
        const { _id } = req.params;
        if (!_id || !req.body) {
            yield transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 404,
                message: "Problemas con la solicitud.",
            }, res);
        }
        const userId = parseInt(_id);
        // TODO: Search user by ID
        const userFound = yield user_model_1.UserModel.findOne({
            where: {
                _id: userId,
            },
            transaction,
        });
        console.log("userFound --> ", userFound);
        // TODO: Confirm that the user exist, if do not exist, then send message.
        if (!userFound) {
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 404,
                message: "Usuario no encontrado",
            }, res);
        }
        // TODO: If user existing then, update the user userToCreated.
        yield userFound.update(req.body, { transaction });
        // await userFound.save(); // Asegurar que la actualización ocurra dentro de la transacción
        yield transaction.commit(); // Confirmar los cambios en la base de datos
        //await userFound.save();
        // TODO: if data has been updated, then the API will send a success message.
        const dataResponse = {
            status: "success",
            message: "el usuario ha sido actualizado satisfactoriamente!",
            data: null,
        };
        res.status(200).json(dataResponse);
    }
    catch (err) {
        yield transaction.rollback();
        return (0, ErrorHandler_1.ErrorHandler)({
            statusCode: 500,
            message: "Ha ocurrido un error en el servidor",
        }, res);
    }
});
exports.updateUser = updateUser;
// DELETE user by Id
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield db_1.default.transaction();
    try {
        // Receive the Id of the user to delete
        const { _id } = req.params; // ID of user
        // if id don't exist
        if (!_id) {
            yield transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 404,
                message: "No fue suministrada un id del usuario",
            }, res);
        }
        // If id exists
        const userId = parseInt(_id);
        const userToDelete = yield user_model_1.UserModel.findOne({
            where: {
                _id: userId,
            },
            transaction,
        });
        if (!userToDelete) {
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 404,
                message: "Usuario no encontrado",
            }, res);
        }
        yield userToDelete.destroy({ transaction });
        yield transaction.commit();
        const dataResponse = {
            status: "success",
            message: "El usuario ha sido eliminado satisfactoriamente",
            data: null,
        };
        res.status(200).json(dataResponse);
    }
    catch (err) {
        yield transaction.rollback();
        return (0, ErrorHandler_1.ErrorHandler)({
            statusCode: 500,
            message: "Ha ocurrido un error en el servidor",
        }, res);
    }
});
exports.deleteUser = deleteUser;
// Get a quantity of users by a Number (Pagination)
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
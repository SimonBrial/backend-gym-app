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
exports.getInvoices = exports.deleteInvoice = exports.updateInvoice = exports.createInvoice = exports.getInvoiceById = void 0;
const invoice_model_1 = require("../models/invoice.model");
const ErrorHandler_1 = require("../helpers/ErrorHandler");
const invoiceDaysCalc_1 = require("../helpers/invoiceDaysCalc");
const user_model_1 = require("../models/user.model");
const fillWithZeros_1 = require("../helpers/fillWithZeros");
const db_1 = __importDefault(require("../db"));
const amount_model_1 = require("../models/amount.model");
const getDollarValue_1 = require("../helpers/getDollarValue");
// READ all users
const getInvoices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const transaction = await sequelize.transaction();
    try {
        // Search in the DDBB
        const invoices = yield invoice_model_1.InvoiceModel.findAll( /* { transaction } */);
        // If there are not any invoices found
        if (!invoices || invoices.length === 0) {
            // await transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 404,
                message: "No se encontraron facturas en la base de datos",
            }, res);
        }
        const dataResponse = {
            status: "success",
            message: "Facturas encontradas",
            data: invoices,
        };
        // await transaction.commit();
        // invoices found
        res.status(200).json(dataResponse);
    }
    catch (err) {
        return (0, ErrorHandler_1.ErrorHandler)({
            statusCode: 400,
            message: "la solicitud no ha podido ser gestionada adecuadamente.",
        }, res);
    }
});
exports.getInvoices = getInvoices;
// READ user By Id
const getInvoiceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield db_1.default.transaction();
    try {
        const { _id } = req.params;
        const invoiceId = parseInt(_id);
        // if _id not exist
        if (!invoiceId || isNaN(invoiceId)) {
            yield transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 400,
                message: "Problema con la solicitud",
            }, res);
        }
        // If _id exist
        const invoiceFound = yield invoice_model_1.InvoiceModel.findOne({
            where: {
                _id: invoiceId,
            },
            transaction,
        });
        // if invoice not found
        if (!invoiceFound) {
            yield transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 404, message: "Factura no encontrado" }, res);
        }
        // Invoice found
        const dataResponse = {
            status: "success",
            message: "Factura encontrada",
            data: invoiceFound,
        };
        yield transaction.commit();
        res.status(200).json(dataResponse);
    }
    catch (error) {
        return (0, ErrorHandler_1.ErrorHandler)({
            statusCode: 400,
            message: "la solicitud no ha podido ser gestionada adecuadamente.",
        }, res);
    }
});
exports.getInvoiceById = getInvoiceById;
// CREATE user
const createInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield db_1.default.transaction();
    try {
        // TODO: Verify if the req.body don't empty.
        // TODO: Verify if the invoice hasn't been created yet.
        if (!req.body) {
            yield transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 400, message: "El cuerpo de la solicitud está vacío" }, res);
        }
        const { paymentMethod, userLastName, phoneNumber, trainerName, trainerDni, direction, userName, comments, userDni, email, plan, } = req.body;
        // Is there an user with the userDni string?
        const userExisting = (yield user_model_1.UserModel.findAll({
            where: { userDni },
            transaction,
        })).map((user) => user.toJSON());
        console.log("userExisting --> ", userExisting);
        // if there isn't an user with that dni string
        if (!userExisting) {
            yield transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 400,
                message: "No existe un usuario con ese DNI, no es posible crearle una factura",
            }, res);
        }
        // If there are more of one user with the same dni string
        if (userExisting.length > 1) {
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 400,
                message: "Existen 2 o mas usuarios con ese DNI, no es posible crearle una factura al usuario solicitado, por favor verificarlo en la base de datos",
            }, res);
        }
        /* const sameInvoices = await InvoiceModel.findAll({ where: { invoiceId } });
        console.log("sameInvoices --> ", sameInvoices);
    
        if (sameInvoices && sameInvoices.length > 0) {
          return ErrorHandler(
            {
              statusCode: 409,
              message:
                "No hay facturas asociadas a este usuario"  "Ya existe un usuario con ese DNI" ,
            },
            res,
          );
        } */
        const totalInvoices = yield invoice_model_1.InvoiceModel.count({ transaction });
        const invoicesDays = (0, invoiceDaysCalc_1.invoiceDaysCalculator)(plan);
        if (typeof invoicesDays === "string") {
            yield transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 400,
                message: "Los datos enviados son incorrectos. Por favor, revise la información proporcionada.",
            }, res);
        }
        const { monitors } = yield (0, getDollarValue_1.getDollarValue)();
        const { firstDay, lastDay } = invoicesDays;
        console.log("plan --> ", plan);
        // last_date && first_date = new
        const planSelected = yield amount_model_1.AmountModel.findOne({
            where: { name: plan },
            transaction,
        });
        // console.log("planSelected --> ", planSelected.toJSON());
        if (!planSelected) {
            yield transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 400,
                message: "No existe el plan seleccionado, por favor indicar otro.",
            }, res);
        }
        const planToAssign = planSelected.toJSON();
        const newInvoice = {
            userLastName,
            trainerDni,
            invoiceId: (0, fillWithZeros_1.fillWithZeros)(totalInvoices + 1, 11),
            firstDate: firstDay,
            userName,
            lastDate: lastDay,
            userDni,
            plan,
            amount: planToAssign.cost, // TODO --> Ajusta el monto según el plan.
            direction: direction ? direction : userExisting[0].direction,
            phoneNumber: phoneNumber ? phoneNumber : userExisting[0].phoneNumber,
            email: email ? email : userExisting[0].email,
            averageValue: (monitors.enparalelovzla.price + monitors.bcv.price) / 2,
            minExchangeDollarValue: monitors.bcv.price,
            maxExchangeDollarValue: monitors.enparalelovzla.price,
            paymentMethod,
            comments,
            trainerName: trainerName ? trainerName : "No asignado",
        };
        // console.log("newInvoice --> ", newInvoice);
        const data = yield invoice_model_1.InvoiceModel.create(newInvoice, { transaction });
        yield transaction.commit();
        // console.log("---> data:", data);
        if (!data) {
            yield transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 400,
                message: "Hubo un problema para crear el registro.",
            }, res);
        }
        const dataResponse = {
            status: "success",
            message: "La factura ha sido creada satisfactoriamente!",
            data: data,
        };
        // Process Complete to create a new user.
        res.status(201).json(dataResponse);
    }
    catch (error) {
        yield transaction.rollback();
        return (0, ErrorHandler_1.ErrorHandler)({
            statusCode: 400,
            message: "La solicitud no ha podido ser gestionada adecuadamente.",
        }, res);
    }
});
exports.createInvoice = createInvoice;
// UPDATE user
const updateInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield db_1.default.transaction();
    try {
        const { _id } = req.params;
        if (!_id || !req.body) {
            yield transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 404, message: "Problemas con la solicitud." }, res);
        }
        const invoiceFound = yield invoice_model_1.InvoiceModel.findOne({
            where: { _id: parseInt(_id) },
            transaction,
        });
        if (!invoiceFound) {
            yield transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 404, message: "Usuario no encontrado" }, res);
        }
        /* const {
          // trainerLastName,
          userLastName,
          trainerName,
          trainerDni,
          invoiceId,
          firstDate,
          lastDate,
          userName,
          userDni,
          amount,
          plan,
        } = req.body as InvoiceBody;
    
        const invoiceToUpdated = {
          // trainerLastName,
          userLastName,
          trainerName,
          trainerDni,
          invoiceId,
          firstDate,
          lastDate,
          userName,
          userDni,
          amount,
          plan,
        }; */
        yield invoiceFound.update(req.body, { transaction });
        yield transaction.commit();
        const dataResponse = {
            status: "success",
            message: "La factura ha sido actualizada satisfactoriamente!",
            data: null,
        };
        res.status(200).json(dataResponse);
    }
    catch (error) {
        yield transaction.rollback();
        return (0, ErrorHandler_1.ErrorHandler)({
            statusCode: 400,
            message: "la solicitud no ha podido ser gestionada adecuadamente.",
        }, res);
    }
});
exports.updateInvoice = updateInvoice;
// DELETE user by Id
const deleteInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield db_1.default.transaction();
    try {
        // Receive the Id of the invoice to delete
        const { _id } = req.params;
        // if id don't exist
        if (!_id || !parseInt(_id)) {
            yield transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 404, message: "No fue suministrada un id de usuario" }, res);
        }
        // If id exists
        const invoiceId = parseInt(_id);
        const invoiceToDelete = yield invoice_model_1.InvoiceModel.findOne({
            where: { _id: invoiceId },
            transaction,
        });
        if (!invoiceToDelete) {
            yield transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 404, message: "Factura no encontrado" }, res);
        }
        yield invoiceToDelete.destroy({ transaction });
        yield transaction.commit();
        const dataResponse = {
            status: "success",
            message: "La factura ha sido eliminado satisfactoriamente",
            data: null,
        };
        res.status(200).json(dataResponse);
    }
    catch (error) {
        yield transaction.rollback();
        return (0, ErrorHandler_1.ErrorHandler)({
            statusCode: 400,
            message: "la solicitud no ha podido ser gestionada adecuadamente.",
        }, res);
    }
});
exports.deleteInvoice = deleteInvoice;
//# sourceMappingURL=invoice.controller.js.map
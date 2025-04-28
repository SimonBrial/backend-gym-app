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
exports.getInvoices = exports.deleteInvoice = exports.updateInvoice = exports.createInvoice = exports.getInvoiceById = void 0;
const invoice_model_1 = require("../models/invoice.model");
const ErrorHandler_1 = require("../helpers/ErrorHandler");
const invoiceDaysCalc_1 = require("../helpers/invoiceDaysCalc");
const user_model_1 = require("../models/user.model");
// READ all users
const getInvoices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Search in the DDBB
        const invoices = yield invoice_model_1.InvoiceModel.findAll();
        // If there are not any invoices found
        if (!invoices || invoices.length === 0) {
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
    try {
        const { _id } = req.params;
        const invoiceId = parseInt(_id);
        // if _id not exist
        if (!invoiceId || isNaN(invoiceId)) {
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
        });
        // if invoice not found
        if (!invoiceFound) {
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 404, message: "Factura no encontrado" }, res);
        }
        // Invoice found
        const dataResponse = {
            status: "success",
            message: "Factura encontrada",
            data: invoiceFound,
        };
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
    try {
        // TODO: Verify if the req.body don't empty.
        // TODO: Verify if the invoice hasn't been created yet.
        const invoiceToCreate = req.body;
        if (!invoiceToCreate) {
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 400, message: "El cuerpo de la solicitud está vacío" }, res);
        }
        const { userLastName, trainerDni, invoiceId, userName, userDni, amount, plan, } = req.body;
        // Is there an user with the userDni string?
        const userExisting = yield user_model_1.UserModel.findAll({
            where: { userDni },
        });
        console.log("userExisting --> ", userExisting.map((user) => user.toJSON()));
        console.log("plan --> ", plan);
        // if there isn't an user with that dni string
        if (!userExisting) {
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
        const totalInvoices = yield invoice_model_1.InvoiceModel.findAll();
        const invoicesDays = (0, invoiceDaysCalc_1.invoiceDaysCalculator)(plan);
        if (typeof invoicesDays === "string") {
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 400,
                message: "Los datos enviados son incorrectos. Por favor, revise la información proporcionada.",
            }, res);
        }
        const { firstDay, lastDay } = invoicesDays;
        // last_date && first_date = new
        const newInvoice /* : UserBody */ = {
            _id: totalInvoices.length + 1,
            userLastName,
            trainerDni,
            invoiceId: crypto.randomUUID(),
            firstDate: firstDay,
            userName,
            lastDate: lastDay,
            userDni,
            amount,
            plan,
            // createdAt: new Date(),
            // updatedAt: new Date(),
        };
        const data = yield invoice_model_1.InvoiceModel.create(newInvoice);
        console.log("---> data:", data);
        if (!data) {
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
        return (0, ErrorHandler_1.ErrorHandler)({
            statusCode: 400,
            message: "la solicitud no ha podido ser gestionada adecuadamente.",
        }, res);
    }
});
exports.createInvoice = createInvoice;
// UPDATE user
const updateInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        return (0, ErrorHandler_1.ErrorHandler)({
            statusCode: 400,
            message: "la solicitud no ha podido ser gestionada adecuadamente.",
        }, res);
    }
});
exports.updateInvoice = updateInvoice;
// DELETE user by Id
const deleteInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Receive the Id of the invoice to delete
        const { _id } = req.params;
        // if id don't exist
        if (!_id || !parseInt(_id)) {
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 404, message: "No fue suministrada un id de usuario" }, res);
        }
        // If id exists
        const invoiceId = parseInt(_id);
        const invoiceToDelete = yield invoice_model_1.InvoiceModel.findOne({
            where: { _id: invoiceId },
        });
        if (!invoiceToDelete) {
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 404, message: "Factura no encontrado" }, res);
        }
        yield invoiceToDelete.destroy();
        const dataResponse = {
            status: "success",
            message: "La factura ha sido eliminado satisfactoriamente",
            data: null,
        };
        res.status(200).json(dataResponse);
    }
    catch (error) {
        return (0, ErrorHandler_1.ErrorHandler)({
            statusCode: 400,
            message: "la solicitud no ha podido ser gestionada adecuadamente.",
        }, res);
    }
});
exports.deleteInvoice = deleteInvoice;
//# sourceMappingURL=invoice.controller.js.map
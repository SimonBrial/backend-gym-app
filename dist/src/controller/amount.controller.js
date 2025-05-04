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
exports.deleteAmount = exports.createAmount = exports.updateAmount = exports.getAmountName = exports.getAmounts = void 0;
const amount_model_1 = require("../models/amount.model");
const ErrorHandler_1 = require("../helpers/ErrorHandler");
const db_1 = __importDefault(require("../db"));
// READ amounts
const getAmounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const amounts = yield amount_model_1.AmountModel.findAll();
        // If there are not any invoices found
        if (!amounts || amounts.length === 0) {
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 404,
                message: "No se encontraron montos de las suscripcion en la base de datos",
            }, res);
        }
        const dataResponse = {
            status: "success",
            message: "Suscripciones encontradas",
            data: amounts,
        };
        // invoices found
        res.status(200).json(dataResponse);
    }
    catch (error) {
        return (0, ErrorHandler_1.ErrorHandler)({
            statusCode: 400,
            message: "la solicitud no ha podido ser gestionada adecuadamente.",
        }, res);
    }
});
exports.getAmounts = getAmounts;
// READ amount by name
const getAmountName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        // if name not exist
        if (!name) {
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 400,
                message: "Problema con la solicitud",
            }, res);
        }
        // If name exist
        const amountFound = yield amount_model_1.AmountModel.findOne({
            where: {
                name,
            },
        });
        // if invoice not found
        if (!amountFound) {
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 404, message: "Monto no encontrado" }, res);
        }
        // Invoice found
        const dataResponse = {
            status: "success",
            message: "Monto encontrada",
            data: amountFound,
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
exports.getAmountName = getAmountName;
// CREATE amounts
const createAmount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield db_1.default.transaction();
    try {
        if (!req.body) {
            yield transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 400, message: "El cuerpo de la solicitud está vacío" }, res);
        }
        const { cost, name } = req.body;
        const existingAmount = yield amount_model_1.AmountModel.findOne({
            where: { name },
            transaction,
        });
        if (existingAmount) {
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 409, message: "Ya existe un monto con ese nombre" }, res);
        }
        const data = yield amount_model_1.AmountModel.create({ name, cost }, { transaction });
        // console.log("---> data:", data);
        if (!data) {
            yield transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 400,
                message: "Hubo un problema para crear el registro.",
            }, res);
        }
        yield transaction.commit();
        const dataResponse = {
            status: "success",
            message: "El monto ha sido creado satisfactoriamente!",
            data: data,
        };
        // Process Complete to create a new trainer.
        res.status(201).json(dataResponse);
    }
    catch (error) {
        yield transaction.rollback();
        return (0, ErrorHandler_1.ErrorHandler)({
            statusCode: 400,
            message: "la solicitud no ha podido ser gestionada adecuadamente.",
        }, res);
    }
});
exports.createAmount = createAmount;
// UPDATE amounts
const updateAmount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield db_1.default.transaction();
    try {
        const { name } = req.params;
        if (!name || !req.body) {
            yield transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 404, message: "Problemas con la solicitud." }, res);
        }
        const amountFound = yield amount_model_1.AmountModel.findOne({
            where: { name },
            transaction,
        });
        if (!amountFound) {
            yield transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 404, message: "Monto no encontrado" }, res);
        }
        const { cost } = req.body;
        const amountUpdated = {
            cost,
            name,
        };
        yield amountFound.update(amountUpdated, { transaction });
        yield transaction.commit();
        // await amountFound.save();
        const dataResponse = {
            status: "success",
            message: "El monto ha sido actualizado satisfactoriamente!",
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
exports.updateAmount = updateAmount;
// DELETE amount
const deleteAmount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield db_1.default.transaction();
    try {
        const { name } = req.params;
        if (!name) {
            yield transaction.rollback();
            (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 400,
                message: "Problemas con la solicitud, no ha podido ser procesada.",
            }, res);
        }
        const amountToDelete = yield amount_model_1.AmountModel.findOne({
            where: { name },
            transaction,
        });
        // if trainer not found
        if (!amountToDelete) {
            yield transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 404, message: "monto no encontrado" }, res);
        }
        // Trainer found
        yield amountToDelete.destroy({ transaction });
        yield transaction.commit();
        const dataResponse = {
            status: "success",
            message: "El monto ha sido eliminado satisfactoriamente",
            data: null,
        };
        // Sending response
        res.status(200).json(dataResponse);
    }
    catch (err) {
        yield transaction.rollback();
        return (0, ErrorHandler_1.ErrorHandler)({
            statusCode: 400,
            message: "la solicitud no ha podido ser gestionada adecuadamente.",
        }, res);
        console.log(err);
    }
});
exports.deleteAmount = deleteAmount;
//# sourceMappingURL=amount.controller.js.map
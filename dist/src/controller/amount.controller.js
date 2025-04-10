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
exports.updateAmount = exports.getAmountName = exports.getAmounts = void 0;
const amount_schema_1 = require("../models/amount.schema");
const ErrorHandler_1 = require("../helpers/ErrorHandler");
// READ amounts
const getAmounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const amounts = yield amount_schema_1.AmountSchema.findAll();
        // If there are not any invoices found
        if (!amounts || amounts.length === 0) {
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 404,
                message: "No se encontraron montos de las suscripcion en la base de datos",
            }, res);
        }
        const dataResponse = {
            status: "success",
            message: "Montos encontrados",
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
        // If _id exist
        const amountFound = yield amount_schema_1.AmountSchema.findOne({
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
// UPDATE amounts
const updateAmount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        return (0, ErrorHandler_1.ErrorHandler)({
            statusCode: 400,
            message: "la solicitud no ha podido ser gestionada adecuadamente.",
        }, res);
    }
});
exports.updateAmount = updateAmount;
//# sourceMappingURL=amount.controller.js.map
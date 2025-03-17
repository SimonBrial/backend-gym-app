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
exports.getInvoices = exports.deleteInvoice = exports.createInvoice = exports.getInvoiceById = void 0;
const invoice_schema_1 = require("../models/invoice.schema");
const ErrorHandler_1 = require("../helpers/ErrorHandler");
// READ all users
const getInvoices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Search in the DDBB
    const invoices = yield invoice_schema_1.InvoiceSchema.findAll();
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
});
exports.getInvoices = getInvoices;
// READ user By Id
const getInvoiceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    const invoiceId = parseInt(_id);
    // if _id not exist
    if (!invoiceId || isNaN(invoiceId)) {
        return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 400, message: "Problema con la solicitud" }, res);
    }
});
exports.getInvoiceById = getInvoiceById;
// CREATE user
const createInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.createInvoice = createInvoice;
// DELETE user by Id
const deleteInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteInvoice = deleteInvoice;
//# sourceMappingURL=invoice.controller.js.map
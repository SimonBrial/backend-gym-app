"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const invoice_controller_1 = require("../controller/invoice.controller");
const invoiceRouter = (0, express_1.Router)();
// TODO: READ all invoices
invoiceRouter.get("/invoices", invoice_controller_1.getInvoices);
// TODO: READ invoice by ID
invoiceRouter.get("/invoice/:_id", invoice_controller_1.getInvoiceById);
// TODO: UPDATE invoice by Id
invoiceRouter.put("/trainer/u/:_id", invoice_controller_1.updateInvoice);
// TODO: DELETE invoice by Id
invoiceRouter.delete("/invoice/d/:_id", invoice_controller_1.deleteInvoice);
// TODO: CREATE invoice
invoiceRouter.post("/invoice/create", invoice_controller_1.createInvoice);
exports.default = invoiceRouter;
//# sourceMappingURL=invoice.route.js.map
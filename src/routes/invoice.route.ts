import { Router } from "express";
import {
  getInvoiceById,
  createInvoice,
  deleteInvoice,
  updateInvoice,
  getInvoices,
} from "../controller/invoice.controller";

const invoiceRouter = Router();

// TODO: READ all invoices
invoiceRouter.get("/invoices", getInvoices);

// TODO: READ invoice by ID
invoiceRouter.get("/invoice/:_id", getInvoiceById);

// TODO: UPDATE invoice by Id
invoiceRouter.put("/trainer/u/:_id", updateInvoice);

// TODO: DELETE invoice by Id
invoiceRouter.delete("/invoice/d/:_id", deleteInvoice);

// TODO: CREATE invoice
invoiceRouter.post("/invoice/create", createInvoice);

export default invoiceRouter;

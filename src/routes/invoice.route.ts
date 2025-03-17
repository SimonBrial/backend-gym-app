import { Router } from "express";
import {
  getInvoiceById,
  createInvoice,
  deleteInvoice,
  // updateInvoice,
  getInvoices,
} from "../controller/invoice.controller";

const invoiceRouter = Router();

// Get all invoices
invoiceRouter.get("/invoices", getInvoices);
// Get invoice by ID
invoiceRouter.get("/invoice/:_id", getInvoiceById);

// UPDATE invoice by Id
// invoiceRouter.put("/trainer/u/:_id", updateTrainer);

// DELETE invoice by Id
invoiceRouter.delete("/invoice/d/:_id", deleteInvoice);

// CREATE invoice
invoiceRouter.post("/invoice/create", createInvoice);

export default invoiceRouter;

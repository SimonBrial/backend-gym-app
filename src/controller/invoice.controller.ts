import { Request, Response } from "express";
import { InvoiceSchema } from "../models/invoice.schema";
import { ErrorHandler } from "../helpers/ErrorHandler";
import {
  CustomRequest,
  CustomResponse,
  InvoiceBody,
  UserBody,
} from "../interface/interface";

// READ all users
const getInvoices = async (req: Request, res: Response): Promise<void> => {
  // Search in the DDBB
  const invoices = await InvoiceSchema.findAll();

  // If there are not any invoices found
  if (!invoices || invoices.length === 0) {
    return ErrorHandler(
      {
        statusCode: 404,
        message: "No se encontraron facturas en la base de datos",
      },
      res,
    );
  }

  const dataResponse: CustomResponse = {
    status: "success",
    message: "Facturas encontradas",
    data: invoices,
  };

  // invoices found
  res.status(200).json(dataResponse);
};
// READ user By Id
const getInvoiceById = async (
  req: CustomRequest<InvoiceBody>,
  res: Response,
): Promise<void> => {
  const { _id } = req.params;

  const invoiceId = parseInt(_id);

  // if _id not exist
  if (!invoiceId || isNaN(invoiceId)) {
    return ErrorHandler(
      { statusCode: 400, message: "Problema con la solicitud" },
      res,
    );
  }
};
// CREATE user
const createInvoice = async (req: Request, res: Response): Promise<void> => {};
// DELETE user by Id
const deleteInvoice = async (req: Request, res: Response): Promise<void> => {};
// UPDATE user by Id
/* const updateInvoice = async (req: Request, res: Response): Promise<void> => {}; */

export {
  getInvoiceById,
  createInvoice,
  // updateInvoice,
  deleteInvoice,
  getInvoices,
};

import { Request, Response } from "express";
import { AmountSchema } from "../models/amount.schema";
import { ErrorHandler } from "../helpers/ErrorHandler";
import {
  CustomResponse,
  CustomRequest,
  AmountBody,
} from "../interface/interface";

// READ amounts
const getAmounts = async (req: Request, res: Response) => {
  try {
    const amounts = await AmountSchema.findAll();

    // If there are not any invoices found
    if (!amounts || amounts.length === 0) {
      return ErrorHandler(
        {
          statusCode: 404,
          message:
            "No se encontraron montos de las suscripcion en la base de datos",
        },
        res,
      );
    }

    const dataResponse: CustomResponse = {
      status: "success",
      message: "Montos encontrados",
      data: amounts,
    };

    // invoices found
    res.status(200).json(dataResponse);
  } catch (error) {
    return ErrorHandler(
      {
        statusCode: 400,
        message: "la solicitud no ha podido ser gestionada adecuadamente.",
      },
      res,
    );
  }
};

// READ amount by name
const getAmountName = async (req: CustomRequest<AmountBody>, res: Response) => {
  try {
    const { name } = req.params;

    // if name not exist
    if (!name) {
      return ErrorHandler(
        {
          statusCode: 400,
          message: "Problema con la solicitud",
        },
        res,
      );
    }

    // If _id exist
    const amountFound = await AmountSchema.findOne({
      where: {
        name,
      },
    });

    // if invoice not found
    if (!amountFound) {
      return ErrorHandler(
        { statusCode: 404, message: "Monto no encontrado" },
        res,
      );
    }

    // Invoice found
    const dataResponse: CustomResponse = {
      status: "success",
      message: "Monto encontrada",
      data: amountFound,
    };

    res.status(200).json(dataResponse);
  } catch (error) {
    return ErrorHandler(
      {
        statusCode: 400,
        message: "la solicitud no ha podido ser gestionada adecuadamente.",
      },
      res,
    );
  }
};

// UPDATE amounts
const updateAmount = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return ErrorHandler(
      {
        statusCode: 400,
        message: "la solicitud no ha podido ser gestionada adecuadamente.",
      },
      res,
    );
  }
};

export { getAmounts, getAmountName, updateAmount };

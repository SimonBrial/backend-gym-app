import { Request, Response } from "express";
import { AmountModel } from "../models/amount.model";
import { ErrorHandler } from "../helpers/ErrorHandler";
import {
  CustomResponse,
  CustomRequest,
  AmountBody,
} from "../interface/interface";

// READ amounts
const getAmounts = async (req: Request, res: Response) => {
  try {
    const amounts = await AmountModel.findAll();

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
const getAmountName = async (
  req: CustomRequest<AmountBody>,
  res: Response,
): Promise<void> => {
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

    // If name exist
    const amountFound = await AmountModel.findOne({
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

// CREATE amounts
const createAmount = async (
  req: CustomRequest<AmountBody>,
  res: Response,
): Promise<void> => {
  try {
    const amountBody = req.body;

    if (!amountBody) {
      return ErrorHandler(
        { statusCode: 400, message: "El cuerpo de la solicitud está vacío" },
        res,
      );
    }

    const { _id, cost, name } = amountBody;

    const sameAmount = await AmountModel.findAll({ where: { name } });

    if (sameAmount && sameAmount.length > 0) {
      return ErrorHandler(
        { statusCode: 409, message: "Ya existe un monto con ese nombre" },
        res,
      );
    }

    const newAmount = {
      _id,
      name,
      cost,
    };

    const data = await AmountModel.create(newAmount);

    console.log("---> data:", data);

    if (!data) {
      return ErrorHandler(
        {
          statusCode: 400,
          message: "Hubo un problema para crear el registro.",
        },
        res,
      );
    }

    const dataResponse: CustomResponse = {
      status: "success",
      message: "El monto ha sido creado satisfactoriamente!",
      data: data,
    };

    // Process Complete to create a new trainer.
    res.status(201).json(dataResponse);
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
const updateAmount = async (
  req: CustomRequest<AmountBody>,
  res: Response,
): Promise<void> => {
  try {
    const { name } = req.params;

    if (!name || !req.body) {
      return ErrorHandler(
        { statusCode: 404, message: "Problemas con la solicitud." },
        res,
      );
    }

    const amountFound = await AmountModel.findOne({ where: { name } });

    if (!amountFound) {
      return ErrorHandler(
        { statusCode: 404, message: "Monto no encontrado" },
        res,
      );
    }

    const { _id, cost } = req.body as AmountBody;

    const amountUpdated = {
      _id,
      cost,
      name,
    };

    amountFound.set(amountUpdated);

    await amountFound.save();

    const dataResponse: CustomResponse = {
      status: "success",
      message: "El monto ha sido actualizado satisfactoriamente!",
      data: null,
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

// DELETE amount
const deleteAmount = async (
  req: CustomRequest<AmountBody>,
  res: Response,
): Promise<void> => {
  try {
    const { name } = req.params;

    if (!name) {
      ErrorHandler(
        {
          statusCode: 400,
          message: "Problemas con la solicitud, no ha podido ser procesada.",
        },
        res,
      );
    }

    const amountToDelete = await AmountModel.findOne({
      where: { name },
    });

    // if trainer not found
    if (!amountToDelete) {
      return ErrorHandler(
        { statusCode: 404, message: "monto no encontrado" },
        res,
      );
    }

    // Trainer found
    await amountToDelete.destroy();

    const dataResponse: CustomResponse = {
      status: "success",
      message: "El monto ha sido eliminado satisfactoriamente",
      data: null,
    };

    // Sending response
    res.status(200).json(dataResponse);
  } catch (err) {
    console.log(err);
    ErrorHandler(
      {
        statusCode: 400,
        message: "la solicitud no ha podido ser gestionada adecuadamente.",
      },
      res,
    );
  }
};

export { getAmounts, getAmountName, updateAmount, createAmount, deleteAmount };

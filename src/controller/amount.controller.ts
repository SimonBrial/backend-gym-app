import { Request, Response } from "express";
import { AmountModel } from "../models/amount.model";
import { ErrorHandler } from "../helpers/ErrorHandler";
import {
  CustomResponse,
  CustomRequest,
  AmountBody,
} from "../interface/interface";
import sequelize from "../db";

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
      message: "Suscripciones encontradas",
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
  const transaction = await sequelize.transaction();
  try {
    if (!req.body) {
      await transaction.rollback();
      return ErrorHandler(
        { statusCode: 400, message: "El cuerpo de la solicitud está vacío" },
        res,
      );
    }

    const { cost, name } = req.body;

    const existingAmount = await AmountModel.findOne({
      where: { name },
      transaction,
    });

    if (existingAmount) {
      return ErrorHandler(
        { statusCode: 409, message: "Ya existe un monto con ese nombre" },
        res,
      );
    }

    const data = await AmountModel.create({ name, cost }, { transaction });

    // console.log("---> data:", data);

    if (!data) {
      await transaction.rollback();
      return ErrorHandler(
        {
          statusCode: 400,
          message: "Hubo un problema para crear el registro.",
        },
        res,
      );
    }

    await transaction.commit();

    const dataResponse: CustomResponse = {
      status: "success",
      message: "El monto ha sido creado satisfactoriamente!",
      data: data,
    };

    // Process Complete to create a new trainer.
    res.status(201).json(dataResponse);
  } catch (error) {
    await transaction.rollback();
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
  const transaction = await sequelize.transaction();
  try {
    const { name } = req.params;

    if (!name || !req.body) {
      await transaction.rollback();
      return ErrorHandler(
        { statusCode: 404, message: "Problemas con la solicitud." },
        res,
      );
    }

    const amountFound = await AmountModel.findOne({
      where: { name },
      transaction,
    });

    if (!amountFound) {
      await transaction.rollback();
      return ErrorHandler(
        { statusCode: 404, message: "Monto no encontrado" },
        res,
      );
    }

    const { cost } = req.body as AmountBody;

    const amountUpdated = {
      cost,
      name,
    };

    await amountFound.update(amountUpdated, { transaction });
    await transaction.commit();

    // await amountFound.save();

    const dataResponse: CustomResponse = {
      status: "success",
      message: "El monto ha sido actualizado satisfactoriamente!",
      data: null,
    };

    res.status(200).json(dataResponse);
  } catch (error) {
    await transaction.rollback();
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
  const transaction = await sequelize.transaction();
  try {
    const { name } = req.params;

    if (!name) {
      await transaction.rollback();
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
      transaction,
    });

    // if trainer not found
    if (!amountToDelete) {
      await transaction.rollback();
      return ErrorHandler(
        { statusCode: 404, message: "monto no encontrado" },
        res,
      );
    }

    // Trainer found
    await amountToDelete.destroy({ transaction });
    await transaction.commit();

    const dataResponse: CustomResponse = {
      status: "success",
      message: "El monto ha sido eliminado satisfactoriamente",
      data: null,
    };

    // Sending response
    res.status(200).json(dataResponse);
  } catch (err) {
    await transaction.rollback();
    return ErrorHandler(
      {
        statusCode: 400,
        message: "la solicitud no ha podido ser gestionada adecuadamente.",
      },
      res,
    );
    console.log(err);
  }
};

export { getAmounts, getAmountName, updateAmount, createAmount, deleteAmount };

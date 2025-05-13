import { Request, Response } from "express";
import { InvoiceModel } from "../models/invoice.model";
import { ErrorHandler } from "../helpers/ErrorHandler";
import {
  InvoiceDaysCalculator,
  CustomResponse,
  CustomRequest,
  InvoiceBody,
  AmountBody,
} from "../interface/interface";
import { invoiceDaysCalculator } from "../helpers/invoiceDaysCalc";
import { UserModel } from "../models/user.model";
import { fillWithZeros } from "../helpers/fillWithZeros";
import sequelize from "../db";
import { AmountModel } from "../models/amount.model";
import { getDollarValue } from "../helpers/getDollarValue";

// READ all users
const getInvoices = async (req: Request, res: Response): Promise<void> => {
  // const transaction = await sequelize.transaction();
  try {
    // Search in the DDBB
    const invoices = await InvoiceModel.findAll(/* { transaction } */);

    // If there are not any invoices found
    if (!invoices || invoices.length === 0) {
      // await transaction.rollback();
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

    // await transaction.commit();

    // invoices found
    res.status(200).json(dataResponse);
  } catch (err) {
    return ErrorHandler(
      {
        statusCode: 400,
        message: "la solicitud no ha podido ser gestionada adecuadamente.",
      },
      res,
    );
  }
};
// READ user By Id
const getInvoiceById = async (
  req: CustomRequest<InvoiceBody>,
  res: Response,
): Promise<void> => {
  const transaction = await sequelize.transaction();
  try {
    const { _id } = req.params;

    const invoiceId = parseInt(_id);

    // if _id not exist
    if (!invoiceId || isNaN(invoiceId)) {
      await transaction.rollback();
      return ErrorHandler(
        {
          statusCode: 400,
          message: "Problema con la solicitud",
        },
        res,
      );
    }

    // If _id exist
    const invoiceFound = await InvoiceModel.findOne({
      where: {
        _id: invoiceId,
      },
      transaction,
    });

    // if invoice not found
    if (!invoiceFound) {
      await transaction.rollback();
      return ErrorHandler(
        { statusCode: 404, message: "Factura no encontrado" },
        res,
      );
    }

    // Invoice found
    const dataResponse: CustomResponse = {
      status: "success",
      message: "Factura encontrada",
      data: invoiceFound,
    };

    await transaction.commit();

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
// CREATE user
const createInvoice = async (
  req: CustomRequest<InvoiceBody>,
  res: Response,
): Promise<void> => {
  const transaction = await sequelize.transaction();
  try {
    // TODO: Verify if the req.body don't empty.
    // TODO: Verify if the invoice hasn't been created yet.

    if (!req.body) {
      await transaction.rollback();
      return ErrorHandler(
        { statusCode: 400, message: "El cuerpo de la solicitud está vacío" },
        res,
      );
    }

    const {
      paymentMethod,
      userLastName,
      phoneNumber,
      trainerName,
      trainerDni,
      direction,
      userName,
      comments,
      userDni,
      email,
      plan,
    } = req.body as InvoiceBody;

    // Is there an user with the userDni string?
    const userExisting = (
      await UserModel.findAll({
        where: { userDni },
        transaction,
      })
    ).map((user) => user.toJSON());

    console.log("userExisting --> ", userExisting);

    // if there isn't an user with that dni string
    if (!userExisting) {
      await transaction.rollback();
      return ErrorHandler(
        {
          statusCode: 400,
          message:
            "No existe un usuario con ese DNI, no es posible crearle una factura",
        },
        res,
      );
    }
    // If there are more of one user with the same dni string
    if (userExisting.length > 1) {
      return ErrorHandler(
        {
          statusCode: 400,
          message:
            "Existen 2 o mas usuarios con ese DNI, no es posible crearle una factura al usuario solicitado, por favor verificarlo en la base de datos",
        },
        res,
      );
    }

    /* const sameInvoices = await InvoiceModel.findAll({ where: { invoiceId } });
    console.log("sameInvoices --> ", sameInvoices);

    if (sameInvoices && sameInvoices.length > 0) {
      return ErrorHandler(
        {
          statusCode: 409,
          message:
            "No hay facturas asociadas a este usuario"  "Ya existe un usuario con ese DNI" ,
        },
        res,
      );
    } */

    const totalInvoices = await InvoiceModel.count({ transaction });

    const invoicesDays = invoiceDaysCalculator(plan);

    if (typeof invoicesDays === "string") {
      await transaction.rollback();
      return ErrorHandler(
        {
          statusCode: 400,
          message:
            "Los datos enviados son incorrectos. Por favor, revise la información proporcionada.",
        },
        res,
      );
    }
    const { monitors } = await getDollarValue();

    const { firstDay, lastDay } = invoicesDays as InvoiceDaysCalculator;

    console.log("plan --> ", plan);

    // last_date && first_date = new

    const planSelected = await AmountModel.findOne({
      where: { name: plan },
      transaction,
    });

    // console.log("planSelected --> ", planSelected.toJSON());

    if (!planSelected) {
      await transaction.rollback();
      return ErrorHandler(
        {
          statusCode: 400,
          message: "No existe el plan seleccionado, por favor indicar otro.",
        },
        res,
      );
    }

    const planToAssign: AmountBody = planSelected.toJSON();

    const newInvoice = {
      userLastName,
      trainerDni,
      invoiceId: fillWithZeros(totalInvoices + 1, 11),
      firstDate: firstDay,
      userName,
      lastDate: lastDay,
      userDni,
      plan,
      amount: planToAssign.cost, // TODO --> Ajusta el monto según el plan.
      direction: direction ? direction : userExisting[0].direction,
      phoneNumber: phoneNumber ? phoneNumber : userExisting[0].phoneNumber,
      email: email ? email : userExisting[0].email,
      averageValue: (monitors.enparalelovzla.price + monitors.bcv.price) / 2,
      minExchangeDollarValue: monitors.bcv.price,
      maxExchangeDollarValue: monitors.enparalelovzla.price,
      paymentMethod,
      comments,
      trainerName: trainerName ? trainerName : "No asignado",
    };

    // console.log("newInvoice --> ", newInvoice);

    const data = await InvoiceModel.create(newInvoice, { transaction });

    await transaction.commit();

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

    const dataResponse: CustomResponse = {
      status: "success",
      message: "La factura ha sido creada satisfactoriamente!",
      data: data,
    };

    // Process Complete to create a new user.
    res.status(201).json(dataResponse);
  } catch (error) {
    await transaction.rollback();
    return ErrorHandler(
      {
        statusCode: 400,
        message: "La solicitud no ha podido ser gestionada adecuadamente.",
      },
      res,
    );
  }
};
// UPDATE user
const updateInvoice = async (
  req: CustomRequest<InvoiceBody>,
  res: Response,
): Promise<void> => {
  const transaction = await sequelize.transaction();
  try {
    const { _id } = req.params;

    if (!_id || !req.body) {
      await transaction.rollback();
      return ErrorHandler(
        { statusCode: 404, message: "Problemas con la solicitud." },
        res,
      );
    }

    const invoiceFound = await InvoiceModel.findOne({
      where: { _id: parseInt(_id) },
      transaction,
    });

    if (!invoiceFound) {
      await transaction.rollback();
      return ErrorHandler(
        { statusCode: 404, message: "Usuario no encontrado" },
        res,
      );
    }

    /* const {
      // trainerLastName,
      userLastName,
      trainerName,
      trainerDni,
      invoiceId,
      firstDate,
      lastDate,
      userName,
      userDni,
      amount,
      plan,
    } = req.body as InvoiceBody;

    const invoiceToUpdated = {
      // trainerLastName,
      userLastName,
      trainerName,
      trainerDni,
      invoiceId,
      firstDate,
      lastDate,
      userName,
      userDni,
      amount,
      plan,
    }; */

    await invoiceFound.update(req.body, { transaction });
    await transaction.commit();

    const dataResponse: CustomResponse = {
      status: "success",
      message: "La factura ha sido actualizada satisfactoriamente!",
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
// DELETE user by Id
const deleteInvoice = async (
  req: CustomRequest<InvoiceBody>,
  res: Response,
): Promise<void> => {
  const transaction = await sequelize.transaction();
  try {
    // Receive the Id of the invoice to delete
    const { _id } = req.params;

    // if id don't exist
    if (!_id || !parseInt(_id)) {
      await transaction.rollback();
      return ErrorHandler(
        { statusCode: 404, message: "No fue suministrada un id de usuario" },
        res,
      );
    }

    // If id exists
    const invoiceId = parseInt(_id);

    const invoiceToDelete = await InvoiceModel.findOne({
      where: { _id: invoiceId },
      transaction,
    });

    if (!invoiceToDelete) {
      await transaction.rollback();
      return ErrorHandler(
        { statusCode: 404, message: "Factura no encontrado" },
        res,
      );
    }

    await invoiceToDelete.destroy({ transaction });
    await transaction.commit();

    const dataResponse: CustomResponse = {
      status: "success",
      message: "La factura ha sido eliminado satisfactoriamente",
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
// UPDATE user by Id
/* const updateInvoice = async (req: Request, res: Response): Promise<void> => {}; */

export {
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getInvoices,
};

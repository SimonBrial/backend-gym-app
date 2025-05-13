import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { ErrorHandler } from "../helpers/ErrorHandler";
import {
  AmountBody,
  CustomRequest,
  CustomResponse,
  InvoiceBody,
  UserBody,
  userCreated,
} from "../interface/interface";
import { invoiceDaysCalculator } from "../helpers/invoiceDaysCalc";
import { InvoiceModel } from "../models/invoice.model";
import sequelize from "../db";
import { fillWithZeros } from "../helpers/fillWithZeros";
import { AmountModel } from "../models/amount.model";
import { getDollarValue } from "../helpers/getDollarValue";

// READ all users
const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    // const user = req.body.name;
    const users: UserBody[] = (await UserModel.findAll()).map((user) =>
      user.toJSON(),
    );
    console.log("users: ", users);

    // No users found
    if (!users || users.length === 0) {
      console.log("DB empty!");
      return ErrorHandler(
        {
          statusCode: 404,
          message: "No se encontraron usuarios en la base de datos",
        },
        res,
      );
    }

    // If user not null Searching invoices
    const invoicesArray: InvoiceBody[] = (await InvoiceModel.findAll()).map(
      (inv) => inv.toJSON(),
    );

    console.log("invoicesArray: ", invoicesArray);
    const newData = users
      .map((user) => {
        const userInvoices = invoicesArray.filter(
          (inv) => inv.userDni === user.userDni,
        );
        return {
          ...user,
          invoicesArray: userInvoices,
        };
      })
      .filter((data: any) => data !== undefined);

    const dataResponse: CustomResponse = {
      status: "success",
      message: "Usuarios encontrados",
      data: newData,
    };

    // Users found
    res.status(200).json(dataResponse);
  } catch (err) {
    ErrorHandler(
      {
        statusCode: 400,
        message: "La solicitud no ha podido ser gestionada adecuadamente.",
      },
      res,
    );
  }
};

// READ user By Id
const getUserById = async (
  req: CustomRequest<UserBody>,
  res: Response,
): Promise<void> => {
  const transaction = await sequelize.transaction();
  try {
    const { _id } = req.params;
    // console.log("Received ID:", _id);
    // If there is problem with the request
    if (!_id) {
      await transaction.rollback();
      return ErrorHandler(
        {
          statusCode: 400,
          message: "Problema con la solicitud",
        },
        res,
      );
    }
    const userId = parseInt(_id);
    // If there isn't any problem with the request
    const userFound = (
      await UserModel.findOne({
        where: {
          _id: userId,
        },
        transaction,
      })
    )?.toJSON();

    // if User not found
    if (!userFound) {
      return ErrorHandler(
        {
          statusCode: 404,
          message: "Usuario no encontrado",
        },
        res,
      );
    }

    // Searching invoices
    const invoicesArray: InvoiceBody[] = (
      await InvoiceModel.findAll({
        where: {
          _id: userId,
        },
        transaction,
      })
    ).map((inv) => inv.toJSON());

    await transaction.commit();

    const newData = {
      ...userFound,
      invoicesArray: invoicesArray,
    };

    // console.log("newData: ", newData);
    /* users
      .map((user) => {
        const userInvoices = invoicesArray.filter(
          (inv) => inv.userDni === user.userDni,
        );
        return {
          ...user,
          invoicesArray: userInvoices,
        };
      })
      .filter((data: any) => data !== undefined); */

    // User found
    const dataResponse: CustomResponse = {
      status: "success",
      message: "Usuario encontrado",
      data: newData,
    };

    res.status(200).json(dataResponse);
  } catch (err) {
    await transaction.rollback();
    return ErrorHandler(
      {
        statusCode: 500,
        message: "Ha ocurrido un error en el servidor",
      },
      res,
    );
  }
};

// CREATE user
const createUser = async (
  req: CustomRequest<userCreated>,
  res: Response,
): Promise<void> => {
  const transaction = await sequelize.transaction();
  try {
    // TODO: Verify if the req.body don't empty.
    // TODO: Verify if the user hasn't been created yet. The DNI should be used for
    // that validation.

    if (!req.body) {
      await transaction.rollback();
      return ErrorHandler(
        { statusCode: 400, message: "El cuerpo de la solicitud está vacío" },
        res,
      );
    }

    const {
      paymentMethod,
      phoneNumber,
      trainerName,
      trainerDni,
      direction,
      trainerId,
      lastName,
      userDni,
      comments,
      weight,
      email,
      plan,
      name,
      age,
    } = req.body as userCreated;

    const sameUsers = await UserModel.findOne({
      where: { userDni },
      transaction,
    });

    /* const totalUsers = allUsers.length;
    const sameUsers: UserBody[] = allUsers.filter(
      (user: UserBody) => user.userDni === userDni,
    ); */

    if (sameUsers) {
      await transaction.rollback();
      return ErrorHandler(
        { statusCode: 409, message: "Ya existe un usuario con ese DNI" },
        res,
      );
    }

    const newUser = {
      // _id: totalUsers + 1, <-- It´s automacally
      phoneNumber,
      trainerDni,
      trainerId,
      direction,
      lastName,
      userDni,
      weight,
      email,
      plan,
      name,
      age,
      trainerName: trainerName ? trainerName : "No asignado",
      registrationDate: new Date(),
      lastPayment: new Date(),
      lastUpdate: new Date(),
      invoicesArray: [""],
      daysOfDebt: 0,
    };

    const userToCreated = await UserModel.create(newUser, { transaction });
    console.log("---> userToCreated:", userToCreated);

    if (!userToCreated) {
      await transaction.rollback();
      return ErrorHandler(
        {
          statusCode: 400,
          message: "Hubo un problema para crear el registro.",
        },
        res,
      );
    }
    // On these place i will add the code to create the first invoice for the user.

    const totalInvoices = await InvoiceModel.count({ transaction });
    const invoiceDays = invoiceDaysCalculator(plan);
    if (typeof invoiceDays === "string") {
      await transaction.rollback();
      return ErrorHandler(
        {
          statusCode: 400,
          message: "El plan del usuario es inválido.",
        },
        res,
      );
    }

    const planSelected: AmountBody | undefined = (
      await AmountModel.findOne({
        where: { name: plan },
        transaction,
      })
    )?.toJSON();

    console.log("planSelected --> ", planSelected);

    if (planSelected === undefined) {
      await transaction.rollback();
      return ErrorHandler(
        {
          statusCode: 400,
          message: "No existe el plan seleccionado, por favor indicar otro.",
        },
        res,
      );
    }

    console.log("planSelected --> ", planSelected);

    const { firstDay, lastDay } = invoiceDays;
    const { monitors } = await getDollarValue();

    const firstInvoice = {
      // _id: totalInvoices + 1, // Genera un ID único para la factura.
      userLastName: lastName,
      trainerDni,
      invoiceId: fillWithZeros(totalInvoices + 1, 11),
      firstDate: firstDay,
      userName: name,
      lastDate: lastDay,
      userDni,
      amount: planSelected.cost, // TODO --> Ajusta el monto según el plan.
      plan,
      direction,
      phoneNumber,
      email,
      averageValue: (monitors.enparalelovzla.price + monitors.bcv.price) / 2,
      minExchangeDollarValue: monitors.bcv.price,
      maxExchangeDollarValue: monitors.enparalelovzla.price,
      paymentMethod,
      comments,
      trainerName: trainerName ? trainerName : "No asignado",
    };

    const createdInvoice = await InvoiceModel.create(firstInvoice, {
      transaction,
    });

    if (!createdInvoice) {
      await transaction.rollback();
      return ErrorHandler(
        {
          statusCode: 400,
          message: "Hubo un problema para crear la primera factura.",
        },
        res,
      );
    }

    // Asegúrate de que invoicesArray sea un array
    if (!Array.isArray(userToCreated.dataValues.invoicesArray)) {
      userToCreated.dataValues.invoicesArray = [];
    }
    // Agrega el ID de la factura y filtra valores vacíos
    userToCreated.dataValues.invoicesArray = [
      ...userToCreated.dataValues.invoicesArray.filter(
        (inv: any) => typeof inv === "object",
      ),
      createdInvoice.toJSON(),
    ];

    // userToCreated.dataValues.invoicesArray.push(invoiceData);

    await userToCreated.update(
      { invoicesArray: userToCreated.dataValues.invoicesArray },
      { where: { userDni }, transaction },
    );

    await transaction.commit();

    const dataUpdated = {
      ...userToCreated.toJSON(),
      invoicesArray: [...userToCreated.toJSON().invoicesArray],
    };

    const dataResponse: CustomResponse = {
      status: "success",
      message: "El usuario ha sido creado satisfactoriamente!",
      data: dataUpdated,
    };

    // Process Complete to create a new user.
    res.status(201).json(dataResponse);

    // const user = res.json({ res: "Creating user" });
  } catch (err) {
    await transaction.rollback();
    ErrorHandler(
      {
        statusCode: 500,
        message: "Ha ocurrido un error en el servidor",
      },
      res,
    );
    console.log("Error:", err);
  }
};

// UPDATE user by Id
const updateUser = async (
  req: CustomRequest<UserBody>,
  res: Response,
): Promise<void> => {
  const transaction = await sequelize.transaction();
  try {
    // TODO: Read ID from request and body.
    const { _id } = req.params;

    if (!_id || !req.body) {
      await transaction.rollback();
      return ErrorHandler(
        {
          statusCode: 404,
          message: "Problemas con la solicitud.",
        },
        res,
      );
    }

    const userId = parseInt(_id);

    // TODO: Search user by ID
    const userFound = await UserModel.findOne({
      where: {
        _id: userId,
      },
      transaction,
    });

    console.log("userFound --> ", userFound);

    // TODO: Confirm that the user exist, if do not exist, then send message.
    if (!userFound) {
      return ErrorHandler(
        {
          statusCode: 404,
          message: "Usuario no encontrado",
        },
        res,
      );
    }

    // TODO: If user existing then, update the user userToCreated.
    await userFound.update(req.body, { transaction });
    // await userFound.save(); // Asegurar que la actualización ocurra dentro de la transacción
    await transaction.commit(); // Confirmar los cambios en la base de datos

    //await userFound.save();

    // TODO: if data has been updated, then the API will send a success message.
    const dataResponse: CustomResponse = {
      status: "success",
      message: "el usuario ha sido actualizado satisfactoriamente!",
      data: null,
    };

    res.status(200).json(dataResponse);
  } catch (err) {
    await transaction.rollback();
    return ErrorHandler(
      {
        statusCode: 500,
        message: "Ha ocurrido un error en el servidor",
      },
      res,
    );
  }
};

// DELETE user by Id
const deleteUser = async (
  req: CustomRequest<UserBody>,
  res: Response,
): Promise<void> => {
  const transaction = await sequelize.transaction();
  try {
    // Receive the Id of the user to delete
    const { _id } = req.params; // ID of user

    // if id don't exist
    if (!_id) {
      await transaction.rollback();
      return ErrorHandler(
        {
          statusCode: 404,
          message: "No fue suministrada un id del usuario",
        },
        res,
      );
    }

    // If id exists
    const userId = parseInt(_id);

    const userToDelete = await UserModel.findOne({
      where: {
        _id: userId,
      },
      transaction,
    });

    if (!userToDelete) {
      return ErrorHandler(
        {
          statusCode: 404,
          message: "Usuario no encontrado",
        },
        res,
      );
    }

    await userToDelete.destroy({ transaction });
    await transaction.commit();

    const dataResponse: CustomResponse = {
      status: "success",
      message: "El usuario ha sido eliminado satisfactoriamente",
      data: null,
    };

    res.status(200).json(dataResponse);
  } catch (err) {
    await transaction.rollback();
    return ErrorHandler(
      {
        statusCode: 500,
        message: "Ha ocurrido un error en el servidor",
      },
      res,
    );
  }
};

// Get a quantity of users by a Number (Pagination)
const pagination = async (req: Request, res: Response): Promise<void> => {
  try {
    res.json({ res: "Pagination", qty: 20 });
  } catch (err) {
    console.log(err);
  }
};
// Authenticate user with JWT Token

export {
  getUserById,
  updateUser,
  deleteUser,
  createUser,
  pagination,
  getUsers,
};

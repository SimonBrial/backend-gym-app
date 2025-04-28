import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { ErrorHandler } from "../helpers/ErrorHandler";
import {
  CustomRequest,
  CustomResponse,
  InvoiceBody,
  UserBody,
} from "../interface/interface";
import { invoiceDaysCalculator } from "../helpers/invoiceDaysCalc";
import { InvoiceModel } from "../models/invoice.model";

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

    // If user not null
    // Searching invoices
    const invoicesArray: InvoiceBody[] = (await InvoiceModel.findAll()).map(
      (inv) => inv.toJSON(),
    );
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
        message: "la solicitud no ha podido ser gestionada adecuadamente.",
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
  try {
    const { _id } = req.params;
    // console.log("Received ID:", _id);
    const userId = parseInt(_id);
    // If there is problem with the request
    if (!userId || isNaN(userId)) {
      return ErrorHandler(
        { statusCode: 400, message: "Problema con la solicitud" },
        res,
      );
    }
    // If there isn't any problem with the request
    const userFound = (
      await UserModel.findOne({
        where: { _id: userId },
      })
    )?.toJSON();

    // if User not found
    if (!userFound) {
      return ErrorHandler(
        { statusCode: 404, message: "Usuario no encontrado" },
        res,
      );
    }

    // Searching invoices
    const invoicesArray: InvoiceBody[] = (
      await InvoiceModel.findAll({
        where: { _id: userId },
      })
    ).map((inv) => inv.toJSON());
    const newData = { ...userFound, invoicesArray: invoicesArray };

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
    return ErrorHandler(
      { statusCode: 500, message: "Ha ocurrido un error en el servidor" },
      res,
    );
  }
};

// CREATE user
const createUser = async (
  req: CustomRequest<UserBody>,
  res: Response,
): Promise<void> => {
  try {
    // TODO: Verify if the req.body don't empty.
    // TODO: Verify if the user hasn't been created yet. The DNI should be used for that validation.

    const userToCreate = req.body;

    if (!userToCreate) {
      return ErrorHandler(
        { statusCode: 400, message: "El cuerpo de la solicitud está vacío" },
        res,
      );
    }

    const {
      trainerDni,
      trainerId,
      lastName,
      userDni,
      weight,
      plan,
      name,
      age,
    } = req.body;

    const allUsers: UserBody[] = (await UserModel.findAll()).map((user) =>
      user.toJSON(),
    );

    const totalUsers = allUsers.length;
    const sameUsers: UserBody[] = allUsers.filter(
      (user: UserBody) => user.userDni === userDni,
    );

    if (sameUsers && sameUsers.length > 0) {
      return ErrorHandler(
        { statusCode: 409, message: "Ya existe un usuario con ese DNI" },
        res,
      );
    }

    const user = {
      _id: totalUsers + 1,
      userDni,
      name,
      lastName,
      age,
      weight,
      trainerId,
      trainerDni,
      plan,
      registrationDate: new Date(),
      lastPayment: new Date(),
      lastUpdate: new Date(),
      daysOfDebt: 0,
      trainerName: "",
      invoicesArray: [""],
      // createdAt: new Date(),
      // updatedAt: new Date(),
    };

    const data = await UserModel.create(user);
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
    // On these place i will add the code to create the first invoice for the user.

    const totalInvoices = (await InvoiceModel.findAll()).map((invoice) =>
      invoice.toJSON(),
    );
    const invoiceDays = invoiceDaysCalculator(plan);
    if (typeof invoiceDays === "string") {
      return ErrorHandler(
        {
          statusCode: 400,
          message: "El plan del usuario es inválido.",
        },
        res,
      );
    }

    const { firstDay, lastDay } = invoiceDays;
    const firstInvoice = {
      _id: totalInvoices.length + 1, // Genera un ID único para la factura.
      userLastName: lastName,
      trainerDni,
      invoiceId: crypto.randomUUID(),
      firstDate: firstDay,
      userName: name,
      lastDate: lastDay,
      userDni,
      amount: 100, // TODO --> Ajusta el monto según el plan.
      plan,
    };
    const createdInvoice = await InvoiceModel.create(firstInvoice);
    if (!createdInvoice) {
      return ErrorHandler(
        {
          statusCode: 400,
          message: "Hubo un problema para crear la primera factura.",
        },
        res,
      );
    }

    // Asegúrate de que invoicesArray sea un array
    if (!Array.isArray(data.dataValues.invoicesArray)) {
      data.dataValues.invoicesArray = [];
    }
    // Agrega el ID de la factura y filtra valores vacíos
    data.dataValues.invoicesArray = [
      ...data.dataValues.invoicesArray,
      createdInvoice.dataValues.invoiceId,
    ].filter((inv) => inv !== "");

    await data.update(
      { invoicesArray: data.dataValues.invoicesArray },
      { where: { userDni } },
    );

    await data.save();

    const dataUpdated = {
      ...data.toJSON(),
      invoicesArray: createdInvoice.toJSON(),
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
    ErrorHandler(
      { statusCode: 500, message: "Ha ocurrido un error en el servidor" },
      res,
    );
    console.log("Error:", err);
  }
};

// DELETE user by Id
const deleteUser = async (
  req: CustomRequest<UserBody>,
  res: Response,
): Promise<void> => {
  try {
    // Receive the Id of the user to delete
    const { _id } = req.params; // ID of user

    // if id don't exist
    if (!_id || !parseInt(_id)) {
      return ErrorHandler(
        { statusCode: 404, message: "No fue suministrada un id del usuario" },
        res,
      );
    }

    // If id exists
    const userId = parseInt(_id);

    const userToDelete = await UserModel.findOne({
      where: { _id: userId },
    });

    if (!userToDelete) {
      return ErrorHandler(
        { statusCode: 404, message: "Usuario no encontrado" },
        res,
      );
    }

    await userToDelete.destroy();

    const dataResponse: CustomResponse = {
      status: "success",
      message: "El usuario ha sido eliminado satisfactoriamente",
      data: null,
    };

    res.status(200).json(dataResponse);
  } catch (err) {
    return ErrorHandler(
      { statusCode: 500, message: "Ha ocurrido un error en el servidor" },
      res,
    );
  }
};
// UPDATE user by Id
const updateUser = async (
  req: CustomRequest<UserBody>,
  res: Response,
): Promise<void> => {
  try {
    // TODO: Read ID from request and body.
    const { _id } = req.params;

    if (!_id || !req.body) {
      return ErrorHandler(
        { statusCode: 404, message: "Problemas con la solicitud." },
        res,
      );
    }

    const userId = parseInt(_id);
    // TODO: Search user by ID
    const userFound = await UserModel.findOne({ where: { _id: userId } });

    console.log("userFound: ", userFound);

    // TODO: Confirm that the user exist, if do not exist, then send message.
    if (!userFound) {
      return ErrorHandler(
        { statusCode: 404, message: "Usuario no encontrado" },
        res,
      );
    }

    // TODO: If user existing then, update the user data.
    const {
      registrationDate,
      trainerName,
      lastPayment,
      daysOfDebt,
      trainerDni,
      lastUpdate,
      invoicesArray,
      trainerId,
      lastName,
      userDni,
      weight,
      name,
      plan,
      age,
    } = req.body;
    console.log("req.body: ", req.body);
    // user.registrationDate  user.lastPayment  user.daysOfDebt  user.last_update
    const userUpdated /* : UserBody */ = {
      _id: _id,
      registrationDate,
      trainerName,
      lastPayment,
      daysOfDebt,
      trainerDni,
      lastUpdate,
      invoicesArray,
      trainerId,
      lastName,
      userDni,
      weight,
      name,
      plan,
      age,
    };
    // TODO: if data has been updated, then the API will send a success message.

    userFound.set(userUpdated);

    await userFound.save();

    const dataResponse: CustomResponse = {
      status: "success",
      message: "el usuario ha sido actualizado satisfactoriamente!",
      data: null,
    };

    res.status(200).json(dataResponse);
  } catch (err) {
    return ErrorHandler(
      { statusCode: 500, message: "Ha ocurrido un error en el servidor" },
      res,
    );
  }
};

// Get a quantity of users by a number (Pagination)
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

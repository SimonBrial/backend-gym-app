import { Request, Response } from "express";
import { UserSchema } from "../models/user.schema";
import { ErrorHandler } from "../helpers/ErrorHandler";
import { UserRequest, UserBody } from "../interface/interface";

// Get all users
const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    // const user = req.body.name;
    const users = await UserSchema.findAll();

    // No users found
    if (!users || users.length === 0) {
      console.log("Something went wrong");
      return ErrorHandler(
        {
          statusCode: 404,
          message: "No se encontraron usuarios en la base de datos",
        },
        res,
      );
    }

    // Users found
    res.status(200).json({ message: "Usuarios encontrados", users });
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

// Get user By Id
const getUserById = async (req: UserRequest, res: Response): Promise<void> => {
  try {
    const { _id } = req.params;
    // If there is problem with the request
    if (!_id) {
      return ErrorHandler(
        { statusCode: 400, message: "Problema con la solicitud" },
        res,
      );
    }
    // If there ins't any problem with the request
    const userFound = await UserSchema.findOne({
      where: { clientid: _id },
    });

    // No User found
    if (!userFound) {
      return ErrorHandler(
        { statusCode: 404, message: "Usuario no encontrado" },
        res,
      );
    }

    // User found
    res.status(200).json({ user: userFound });
  } catch (err) {
    ErrorHandler(
      { statusCode: 500, message: "Ha ocurrido un error en el servidor" },
      res,
    );
  }
};

// Create user
const createUser = async (req: UserRequest, res: Response): Promise<void> => {
  try {
    const users = await UserSchema.findAll();
    if (!users || users.length === 0) {
      return ErrorHandler(
        { statusCode: 404, message: "Algo ha pasado con la solicitud" },
        res,
      );
    }
    const {
      registration_date,
      days_of_debt,
      trainer_name,
      last_payment,
      last_updated,
      invoices_id,
      trainer_id,
      weight,
      name,
      dni,
      age,
    } = req.body;

    const user: UserBody = {
      client_id: users.length + 1,
      registration_date,
      days_of_debt,
      trainer_name,
      last_payment,
      last_updated,
      invoices_id,
      trainer_id,
      weight,
      name,
      dni,
      age,
    };

    const data = await UserSchema.create({ user });

    res
      .sendStatus(201)
      .json({ message: "El usuario ha sido creado", user: data });

    // const user = res.json({ res: "Creating user" });
  } catch (err) {
    ErrorHandler(
      { statusCode: 500, message: "Ha ocurrido un error en el servidor" },
      res,
    );
  }
};

// Update user by Id
const deleteUsers = async (req: UserRequest, res: Response): Promise<void> => {
  try {
    // Find user to delete
    const { _id } = req.params; // ID of user

    // if id doesn't exist
    if (!_id) {
      return ErrorHandler(
        { statusCode: 404, message: "No fue suministrada un id de usuario" },
        res,
      );
    }

    // Id id exists
    const userToDelete = await UserSchema.findOne({
      where: { clientid: _id },
    });

    if (!userToDelete) {
      return ErrorHandler(
        { statusCode: 404, message: "Usuario no encontrado" },
        res,
      );
    }

    await userToDelete.destroy();

    res.json({ res: "Updating user" });
  } catch (err) {
    console.log(err);
  }
};
// Delete user by Id
const updateUsers = async (req: UserRequest, res: Response): Promise<void> => {
  try {
    res.json({ res: "Deleting user" });
  } catch (err) {
    console.log(err);
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
  updateUsers,
  deleteUsers,
  createUser,
  pagination,
  getUsers,
};

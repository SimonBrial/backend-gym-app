import { Request, Response } from "express";
import { UserSchema } from "../models/user.schema";
import { ErrorHandler } from "../helpers/ErrorHandler";
import { UserRequest, UserBody } from "../interface/interface";

// Get all users
const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    // const user = req.body.name;
    const users = await UserSchema.findAll();
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

    // Users found
    res.status(200).json({ message: "Usuarios encontrados", data: users });
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
    console.log("Received ID:", _id);
    const userId = parseInt(_id);
    // If there is problem with the request
    if (!userId || isNaN(userId)) {
      return ErrorHandler(
        { statusCode: 400, message: "Problema con la solicitud" },
        res,
      );
    }
    // If there isn't any problem with the request
    const userFound = await UserSchema.findOne({
      where: { _id: userId },
    });

    // User not found
    if (!userFound) {
      return ErrorHandler(
        { statusCode: 404, message: "Usuario no encontrado" },
        res,
      );
    }
    const dataResponse = {
      status: "success",
      message: "Usuario encontrado",
      data: userFound,
    };

    // User found
    res.status(200).json(dataResponse);
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
    // TODO: Verify if the req.body doesn't empty.
    // TODO: Verify if the user hasn't already been created. The DNI should be used for that validation.

    const userToCreate = req.body;

    if (!userToCreate) {
      return ErrorHandler(
        { statusCode: 400, message: "El cuerpo de la solicitud está vacío" },
        res,
      );
    }

    const {
      trainer_dni,
      trainer_id,
      last_name,
      user_dni,
      weight,
      plan,
      name,
      age,
    } = req.body;

    const sameUsers = await UserSchema.findAll({ where: { user_dni } });

    if (sameUsers && sameUsers.length > 0) {
      return ErrorHandler(
        { statusCode: 409, message: "Ya existe un usuario con ese DNI" },
        res,
      );
    }

    const totalUsers = await UserSchema.findAll();

    const user /* : UserBody */ = {
      _id: totalUsers.length + 1,
      user_dni,
      name,
      last_name,
      age,
      weight,
      trainer_id,
      trainer_dni,
      plan,
      registration_date: new Date(),
      last_payment: new Date(),
      last_update: new Date(),
      days_of_debt: 0,
      trainer_name: "",
      invoices_id: [""],
      // createdAt: new Date(),
      // updatedAt: new Date(),
    };

    const data = await UserSchema.create(user);
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
    // Process Complete to create a new user.
    res.status(201).json({
      status: "success",
      message: "El usuario ha sido creado satisfactoriamente!",
      user: data,
    });

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
const deleteUser = async (req: UserRequest, res: Response): Promise<void> => {
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

    // If id exists
    const userToDelete = await UserSchema.findOne({
      where: { _id: _id },
    });

    if (!userToDelete) {
      return ErrorHandler(
        { statusCode: 404, message: "Usuario no encontrado" },
        res,
      );
    }

    await userToDelete.destroy();

    res.status(200).json({
      status: "sucess",
      message: "El usuario ha sido eliminado satisfactoriamente",
      data: null,
    });
  } catch (err) {
    console.log(err);
  }
};
// UPDATE user by Id
const updateUser = async (req: UserRequest, res: Response): Promise<void> => {
  try {
    // TODO: Read ID from request
    // TODO: Search user by ID
    // TODO: Confirm that the user exist, if do not exist, then send message.
    // TODO: If user existing then update the user data.
    // TODO: if data has been updated, then the API will send a success message.
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
  updateUser,
  deleteUser,
  createUser,
  pagination,
  getUsers,
};

import { Request, Response } from "express";
import { ErrorHandler } from "../helpers/ErrorHandler";
import { TrainerSchema } from "../models/trainer.schema";
import {
  CustomResponse,
  CustomRequest,
  TrainerBody,
} from "../interface/interface";

// READ all trainers
const getTrainers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Searching all trainer
    const trainers = await TrainerSchema.findAll();

    // if not found trainers in the DDBB.
    if (!trainers || trainers.length === 0) {
      return ErrorHandler(
        {
          statusCode: 404,
          message: "No se encontraron entrenadores en la base de datos",
        },
        res,
      );
    }

    const dataResponse: CustomResponse = {
      status: "success",
      message: "Entrenadores encontrados",
      data: trainers,
    };

    // Trainer found
    res.status(200).json(dataResponse);
  } catch (err) {
    console.log(err);
    return ErrorHandler(
      {
        statusCode: 400,
        message: "la solicitud no ha podido ser gestionada adecuadamente.",
      },
      res,
    );
  }
};

// READ trainer by ID
const getTrainerById = async (
  req: CustomRequest<TrainerBody>,
  res: Response,
): Promise<void> => {
  try {
    // Read the ?id from the request parameters
    const { _id } = req.params;

    console.log("Received ID:", _id);
    const trainerId = parseInt(_id);

    // if _id in not found
    if (!_id || isNaN(trainerId)) {
      return ErrorHandler(
        {
          statusCode: 400,
          message: "Problemas con la solicitud, no ha podido ser procesada.",
        },
        res,
      );
    }

    // if there isn't problem with the params of the request.
    const trainerFound = await TrainerSchema.findOne({
      where: { _id: trainerId },
    });

    // if trainer not found
    if (!trainerFound) {
      return ErrorHandler(
        { statusCode: 404, message: "Entrenador no encontrado" },
        res,
      );
    }

    // Trainer found
    const dataResponse: CustomResponse = {
      status: "success",
      message: "Entrenador encontrado",
      data: trainerFound,
    };

    // Sending response
    res.status(200).json(dataResponse);
  } catch (err) {
    console.log(err);
    return ErrorHandler(
      {
        statusCode: 400,
        message: "la solicitud no ha podido ser gestionada adecuadamente.",
      },
      res,
    );
  }
};
// UPDATE trainer by Id
const updateTrainer = async (
  req: CustomRequest<TrainerBody>,
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

    const trainerId = parseInt(_id);
    // TODO: Search trainer by ID
    const trainerFound = await TrainerSchema.findOne({ where: { _id: _id } });

    // TODO: Confirm that the trainer exist, if do not exist, then send message.
    if (!trainerFound) {
      return ErrorHandler(
        { statusCode: 404, message: "Trainer no encontrado" },
        res,
      );
    }

    // TODO: If trainer existing then, update the trainer data.
    const { age, area, assigned_clients, last_name, name, trainer_dni } =
      req.body;
    const userUpdated /* : TrainerBody */ = {
      _id: _id,
      assigned_clients,
      trainer_dni,
      last_name,
      area,
      name,
      age,
    };
    // TODO: if data has been updated, then the API will send a success message.

    trainerFound.set(userUpdated);

    await trainerFound.save();

    const dataResponse: CustomResponse = {
      status: "success",
      message: "El entrenador ha sido actualizado satisfactoriamente!",
      data: null,
    };

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

// DELETE trainer by Id
const deleteTrainer = async (
  req: CustomRequest<TrainerBody>,
  res: Response,
): Promise<void> => {
  try {
    // Receive the Id of the trainer to delete
    const { _id } = req.params; // ID of trainer

    console.log("Received ID:", _id);

    // if _id in not found
    if (!_id || !parseInt(_id)) {
      ErrorHandler(
        {
          statusCode: 400,
          message: "Problemas con la solicitud, no ha podido ser procesada.",
        },
        res,
      );
    }

    // if there isn't problem with the params of the request.
    const trainerId = parseInt(_id);

    const trainerToDelete = await TrainerSchema.findOne({
      where: { _id: trainerId },
    });

    // if trainer not found
    if (!trainerToDelete) {
      return ErrorHandler(
        { statusCode: 404, message: "Entrenador no encontrado" },
        res,
      );
    }

    // Trainer found
    await trainerToDelete.destroy();

    const dataResponse: CustomResponse = {
      status: "success",
      message: "El entrenador ha sido eliminado satisfactoriamente",
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

// CREATE trainer
const createTrainer = async (
  req: CustomRequest<TrainerBody>,
  res: Response,
): Promise<void> => {
  try {
    // TODO: Verify if the req.body don't empty.
    // TODO: Verify if the user hasn't been created yet. The DNI should be used for that validation.

    const trainerToCreate = req.body;

    if (!trainerToCreate) {
      return ErrorHandler(
        { statusCode: 400, message: "El cuerpo de la solicitud está vacío" },
        res,
      );
    }

    const { age, area, last_name, name, trainer_dni, assigned_clients } =
      req.body;

    const sameTrainer = await TrainerSchema.findAll({ where: { trainer_dni } });

    if (sameTrainer && sameTrainer.length > 0) {
      return ErrorHandler(
        { statusCode: 409, message: "Ya existe un entrenador con ese DNI" },
        res,
      );
    }

    const totalTrainer = await TrainerSchema.findAll();

    const trainer = {
      _id: totalTrainer.length + 1,
      assigned_clients,
      trainer_dni,
      last_name,
      area,
      name,
      age,
    };

    const data = await TrainerSchema.create(trainer);

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
      message: "El entrenador ha sido creado satisfactoriamente!",
      data: data,
    };

    // Process Complete to create a new trainer.
    res.status(201).json(dataResponse);
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

export {
  getTrainerById,
  updateTrainer,
  deleteTrainer,
  createTrainer,
  getTrainers,
};

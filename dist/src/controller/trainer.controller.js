"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrainers = exports.createTrainer = exports.deleteTrainer = exports.updateTrainer = exports.getTrainerById = void 0;
const ErrorHandler_1 = require("../helpers/ErrorHandler");
const trainer_model_1 = require("../models/trainer.model");
const db_1 = __importDefault(require("../db"));
// READ all trainers
const getTrainers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Searching all trainer
        const trainers = yield trainer_model_1.TrainerModel.findAll();
        // if not found trainers in the DDBB.
        if (!trainers || trainers.length === 0) {
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 404,
                message: "No se encontraron entrenadores en la base de datos",
            }, res);
        }
        const dataResponse = {
            status: "success",
            message: "Entrenadores encontrados",
            data: trainers,
        };
        // Trainer found
        res.status(200).json(dataResponse);
    }
    catch (err) {
        console.log(err);
        return (0, ErrorHandler_1.ErrorHandler)({
            statusCode: 400,
            message: "la solicitud no ha podido ser gestionada adecuadamente.",
        }, res);
    }
});
exports.getTrainers = getTrainers;
// READ trainer by ID
const getTrainerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield db_1.default.transaction();
    try {
        // Read the ?id from the request parameters
        const { _id } = req.params;
        console.log("Received ID:", _id);
        const trainerId = parseInt(_id);
        // if _id in not found
        if (!_id || isNaN(trainerId)) {
            yield transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 400,
                message: "Problemas con la solicitud, no ha podido ser procesada.",
            }, res);
        }
        // if there isn't problem with the params of the request.
        const trainerFound = yield trainer_model_1.TrainerModel.findOne({
            where: { _id: trainerId },
            transaction,
        });
        // if trainer not found
        if (!trainerFound) {
            yield transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 404, message: "Entrenador no encontrado" }, res);
        }
        // Trainer found
        const dataResponse = {
            status: "success",
            message: "Entrenador encontrado",
            data: trainerFound,
        };
        // Sending response
        res.status(200).json(dataResponse);
    }
    catch (err) {
        console.log(err);
        yield transaction.rollback();
        return (0, ErrorHandler_1.ErrorHandler)({
            statusCode: 400,
            message: "la solicitud no ha podido ser gestionada adecuadamente.",
        }, res);
    }
});
exports.getTrainerById = getTrainerById;
// CREATE trainer
const createTrainer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield db_1.default.transaction();
    try {
        // TODO: Verify if the req.body don't empty.
        // TODO: Verify if the user hasn't been created yet. The DNI should be used for that validation.
        if (!req.body) {
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 400, message: "El cuerpo de la solicitud está vacío" }, res);
        }
        const { age, area, lastName, name, trainerDni, assignedClients } = req.body;
        const allTrainer = (yield trainer_model_1.TrainerModel.findAll({ transaction })).map((trainer) => trainer.toJSON());
        const totalTrainer = allTrainer.length;
        const sameTrainer = allTrainer.filter((trainer) => trainer.trainerDni === trainerDni);
        if (sameTrainer && sameTrainer.length > 0) {
            yield transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 409, message: "Ya existe un entrenador con ese DNI" }, res);
        }
        const trainer = {
            _id: totalTrainer + 1,
            assignedClients,
            trainerDni,
            lastName,
            area,
            name,
            age,
        };
        const data = yield trainer_model_1.TrainerModel.create(trainer, { transaction });
        console.log("---> data:", data);
        if (!data) {
            yield transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 400,
                message: "Hubo un problema para crear el registro.",
            }, res);
        }
        const dataResponse = {
            status: "success",
            message: "El entrenador ha sido creado satisfactoriamente!",
            data: data,
        };
        // Process Complete to create a new trainer.
        res.status(201).json(dataResponse);
    }
    catch (err) {
        console.log(err);
        (0, ErrorHandler_1.ErrorHandler)({
            statusCode: 400,
            message: "la solicitud no ha podido ser gestionada adecuadamente.",
        }, res);
    }
});
exports.createTrainer = createTrainer;
// UPDATE trainer by Id
const updateTrainer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield db_1.default.transaction();
    try {
        // TODO: Read ID from request and body.
        const { _id } = req.params;
        if (!_id || !req.body) {
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 404, message: "Problemas con la solicitud." }, res);
        }
        const trainerId = parseInt(_id);
        // TODO: Search trainer by ID
        const trainerFound = yield trainer_model_1.TrainerModel.findOne({
            where: { _id: trainerId },
            transaction,
        });
        // TODO: Confirm that the trainer exist, if do not exist, then send message.
        if (!trainerFound) {
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 404, message: "Trainer no encontrado" }, res);
        }
        // TODO: If trainer existing then, update the trainer data.
        const { age, area, assignedClients, lastName, name, trainerDni } = req.body;
        const userUpdated /* : TrainerBody */ = {
            _id: trainerId,
            assignedClients,
            trainerDni,
            lastName,
            area,
            name,
            age,
        };
        // TODO: if data has been updated, then the API will send a success message.
        yield trainerFound.update(userUpdated);
        yield transaction.commit();
        const dataResponse = {
            status: "success",
            message: "El entrenador ha sido actualizado satisfactoriamente!",
            data: null,
        };
        res.status(200).json(dataResponse);
    }
    catch (err) {
        console.log(err);
        (0, ErrorHandler_1.ErrorHandler)({
            statusCode: 400,
            message: "la solicitud no ha podido ser gestionada adecuadamente.",
        }, res);
    }
});
exports.updateTrainer = updateTrainer;
// DELETE trainer by Id
const deleteTrainer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield db_1.default.transaction();
    try {
        // Receive the Id of the trainer to delete
        const { _id } = req.params; // ID of trainer
        console.log("Received ID:", _id);
        // if _id in not found
        if (!_id || !parseInt(_id)) {
            (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 400,
                message: "Problemas con la solicitud, no ha podido ser procesada.",
            }, res);
        }
        // if there isn't problem with the params of the request.
        const trainerId = parseInt(_id);
        const trainerToDelete = yield trainer_model_1.TrainerModel.findOne({
            where: { _id: trainerId },
            transaction,
        });
        // if trainer not found
        if (!trainerToDelete) {
            yield transaction.rollback();
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 404, message: "Entrenador no encontrado" }, res);
        }
        // Trainer found
        yield trainerToDelete.destroy({ transaction });
        const dataResponse = {
            status: "success",
            message: "El entrenador ha sido eliminado satisfactoriamente",
            data: null,
        };
        // Sending response
        res.status(200).json(dataResponse);
    }
    catch (err) {
        console.log(err);
        yield transaction.rollback();
        (0, ErrorHandler_1.ErrorHandler)({
            statusCode: 400,
            message: "la solicitud no ha podido ser gestionada adecuadamente.",
        }, res);
    }
});
exports.deleteTrainer = deleteTrainer;
//# sourceMappingURL=trainer.controller.js.map
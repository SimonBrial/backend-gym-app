import { Router } from "express";
import {
  getTrainers,
  createTrainer,
  deleteTrainer,
  getTrainerById,
  updateTrainer,
} from "../controller/trainer.controller";

const trainerRouter = Router();

// TODO: READ all trainers
trainerRouter.get("/trainers", getTrainers);
// TODO: READ trainer by ID
trainerRouter.get("/trainer/:_id", getTrainerById);

// TODO: UPDATE trainer by Id
trainerRouter.put("/trainer/u/:_id", updateTrainer);

// TODO: DELETE trainer by Id
trainerRouter.delete("/trainer/d/:_id", deleteTrainer);

// TODO: CREATE trainer
trainerRouter.post("/trainer/create", createTrainer);

export default trainerRouter;

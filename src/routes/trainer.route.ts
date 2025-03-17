import { Router } from "express";
import {
  getTrainers,
  createTrainer,
  deleteTrainer,
  getTrainerById,
  updateTrainer,
} from "../controller/trainer.controller";

const trainerRouter = Router();

// Get all trainers
trainerRouter.get("/trainers", getTrainers);
// Get trainer by ID
trainerRouter.get("/trainer/:_id", getTrainerById);

// UPDATE trainer by Id
trainerRouter.put("/trainer/u/:_id", updateTrainer);

// DELETE trainer by Id
trainerRouter.delete("/trainer/d/:_id", deleteTrainer);

// CREATE trainer
trainerRouter.post("/trainer/create", createTrainer);

export default trainerRouter;

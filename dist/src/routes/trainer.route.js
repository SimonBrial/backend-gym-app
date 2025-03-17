"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trainer_controller_1 = require("../controller/trainer.controller");
const trainerRouter = (0, express_1.Router)();
// Get all trainers
trainerRouter.get("/trainers", trainer_controller_1.getTrainers);
// Get trainer by ID
trainerRouter.get("/trainer/:_id", trainer_controller_1.getTrainerById);
// UPDATE trainer by Id
trainerRouter.put("/trainer/u/:_id", trainer_controller_1.updateTrainer);
// DELETE trainer by Id
trainerRouter.delete("/trainer/d/:_id", trainer_controller_1.deleteTrainer);
// CREATE trainer
trainerRouter.post("/trainer/create", trainer_controller_1.createTrainer);
exports.default = trainerRouter;
//# sourceMappingURL=trainer.route.js.map
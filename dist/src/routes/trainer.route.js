"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trainer_controller_1 = require("../controller/trainer.controller");
const trainerRouter = (0, express_1.Router)();
// TODO: READ all trainers
trainerRouter.get("/trainers", trainer_controller_1.getTrainers);
// TODO: READ trainer by ID
trainerRouter.get("/trainer/:_id", trainer_controller_1.getTrainerById);
// TODO: UPDATE trainer by Id
trainerRouter.put("/trainer/u/:_id", trainer_controller_1.updateTrainer);
// TODO: DELETE trainer by Id
trainerRouter.delete("/trainer/d/:_id", trainer_controller_1.deleteTrainer);
// TODO: CREATE trainer
trainerRouter.post("/trainer/create", trainer_controller_1.createTrainer);
exports.default = trainerRouter;
//# sourceMappingURL=trainer.route.js.map
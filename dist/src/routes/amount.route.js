"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const amount_controller_1 = require("../controller/amount.controller");
const amountRouter = (0, express_1.Router)();
// Get all amounts
amountRouter.get("/amounts", amount_controller_1.getAmounts);
// Get amount by ID
amountRouter.get("/amount/:name", amount_controller_1.getAmountName);
// UPDATE amount by Id
amountRouter.put("/amount/u/:name", amount_controller_1.updateAmount);
// CREATE amount
amountRouter.post("/amount/create", amount_controller_1.createAmount);
// DELETE amount
amountRouter.delete("/amount/d/:name", amount_controller_1.deleteAmount);
exports.default = amountRouter;
//# sourceMappingURL=amount.route.js.map
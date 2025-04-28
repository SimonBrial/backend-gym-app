import { Router } from "express";
import {
  getAmountName,
  updateAmount,
  createAmount,
  deleteAmount,
  getAmounts,
} from "../controller/amount.controller";

const amountRouter = Router();

// Get all amounts
amountRouter.get("/amounts", getAmounts);

// Get amount by ID
amountRouter.get("/amount/:name", getAmountName);

// UPDATE amount by Id
amountRouter.put("/amount/u/:name", updateAmount);

// CREATE amount
amountRouter.post("/amount/create", createAmount);

// DELETE amount
amountRouter.delete("/amount/d/:name", deleteAmount);

export default amountRouter;

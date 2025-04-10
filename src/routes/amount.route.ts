import { Router } from "express";
import {
  getAmountName,
  updateAmount,
  getAmounts,
} from "../controller/amount.controller";

const amountRouter = Router();

// Get all amounts
amountRouter.get("/amounts", getAmounts);

// Get amount by ID
amountRouter.get("/amount/:name", getAmountName);

// UPDATE amount by Id
amountRouter.put("/trainer/u/:name", updateAmount);

// CREATE amount
// amountRouter.post("/amount/create", createAmount);

export default amountRouter;

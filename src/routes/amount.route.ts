import { Router } from "express";
import {
  getAmountName,
  updateAmount,
  createAmount,
  deleteAmount,
  getAmounts,
} from "../controller/amount.controller";

const amountRouter = Router();

// TODO: READ all amounts
amountRouter.get("/amounts", getAmounts);

// TODO: READ amount by ID
amountRouter.get("/amount/:name", getAmountName);

// TODO: UPDATE amount by Id
amountRouter.put("/amount/u/:name", updateAmount);

// TODO: CREATE amount
amountRouter.post("/amount/create", createAmount);

// TODO: DELETE amount
amountRouter.delete("/amount/d/:name", deleteAmount);

export default amountRouter;

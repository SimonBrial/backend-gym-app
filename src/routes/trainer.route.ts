import { Router } from "express";

const trainerRouter = Router();

// Get all invoice
trainerRouter.get("/invoices", () => {});
// Get invoice by ID
trainerRouter.get("/invoice/:_id", () => {});

// Update invoice by Id
trainerRouter.put("/invoice/:_id", () => {});

// Delete invoice by Id
trainerRouter.delete("/invoice/:_id", () => {});

// Create invoice
trainerRouter.post("/invoice/create", () => {});

export default trainerRouter;
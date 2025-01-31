import { Response } from "express";
import { IErrorHandler } from "../interface/interface";

export const ErrorHandler = (err: IErrorHandler, res: Response) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ error: message });
};

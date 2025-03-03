import { Request } from "express";
import { trainerPlan } from "../types/types";

interface IErrorHandler {
  statusCode: number;
  message: string;
}

interface UserBody {
  _id: number; // This is not the client Id, it's just for the DB requeriments.
  user_dni: string;
  name: string;
  last_name: string;
  weight: number;
  age: number;
  plan: trainerPlan;
  registration_date: Date;
  last_payment: Date;
  days_of_debt: number;
  trainer_id?: string;
  trainer_dni?: string;
  trainer_name?: string;
  last_update: Date;
  invoices_id?: string[];
  /*  createdAt: Date;
  updatedAt: Date; */
}
interface UserCreateBody {
  _id: number; // This is not the client Id, it's just for the DB requeriments.
  user_dni: string;
  name: string;
  last_name: string;
  weight: number;
  age: number;
  plan: trainerPlan;
  trainer_dni?: string;
  trainer_name?: string;
  /* createdAt: Date;
  updatedAt: Date; */
}

interface RequestQuery {
  limit?: number;
}

interface RequestParams {
  _id: string;
}

interface UserRequest extends Request {
  params: RequestParams;
  query?: RequestQuery;
  body: UserBody;
}

export type {
  UserBody,
  IErrorHandler,
  RequestParams,
  RequestQuery,
  UserRequest,
};

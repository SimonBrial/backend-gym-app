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

interface UserBodyCreating {
  user_dni: string;
  name: string;
  last_name: string;
  weight: number;
  plan: trainerPlan;
  age: number;
  trainer_dni?: string;
  trainer_id?: string;
}

interface TrainerBody {
  _id: number; // This is not the client Id, it's just for the DB requeriments.
  trainer_dni: string;
  name: string;
  last_name: string;
  age: number;
  area: string;
  assigned_clients: string[];
}
interface TrainerBodyCreating {
  _id: number; // This is not the client Id, it's just for the DB requeriments.
  trainer_dni: string;
  name: string;
  last_name: string;
  age: number;
  area: string;
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
  p;
}

interface RequestParams {
  _id: string;
}

interface CustomRequest<T> extends Request {
  params: RequestParams;
  query?: RequestQuery;
  body: T;
}

export type {
  TrainerBodyCreating,
  UserBodyCreating,
  IErrorHandler,
  RequestParams,
  CustomRequest,
  RequestQuery,
  TrainerBody,
  UserBody,
};

import { Request } from "express";
import { trainerPlan, statusStr } from "../types/types";

interface IErrorHandler {
  statusCode: number;
  message: string;
}

interface UserBody {
  _id: number; // This is not the client Id, it's just for the DB requeriments.
  userDni: string;
  name: string;
  lastName: string;
  weight: number;
  age: number;
  plan: trainerPlan;
  registrationDate: Date;
  lastPayment: Date;
  daysOfDebt: number;
  trainerId?: string;
  trainerDni?: string;
  trainerName?: string;
  lastUpdate: Date;
  invoicesArray?: any[];
  /*  createdAt: Date;
  updatedAt: Date; */
}

interface InvoiceBody {
  _id: number;
  invoiceId: string;
  userDni: string;
  userName: string;
  userLastName: string;
  // trainer_id?: number;
  trainerDni?: string;
  trainerName?: string;
  trainerLastName?: string;
  firstDate: Date;
  lastDate: Date;
  amount: number;
  plan: trainerPlan;
}

interface AmountBody {
  _id: number;
  cost: number;
  name: string;
}

interface UserBodyCreating {
  userDni: string;
  name: string;
  lastName: string;
  weight: number;
  plan: trainerPlan;
  age: number;
  trainerDni?: string;
  trainerId?: string;
}

interface TrainerBody {
  _id: number; // This is not the client Id, it's just for the DB requeriments.
  trainerDni: string;
  name: string;
  lastName: string;
  age: number;
  area: string;
  assignedClients: string[];
}
interface TrainerBodyCreating {
  _id: number; // This is not the client Id, it's just for the DB requeriments.
  trainerDni: string;
  name: string;
  lastName: string;
  age: number;
  area: string;
}

interface UserCreateBody {
  _id: number; // This is not the client Id, it's just for the DB requeriments.
  userDni: string;
  name: string;
  lastName: string;
  weight: number;
  age: number;
  plan: trainerPlan;
  trainerDni?: string;
  trainerName?: string;
  /* createdAt: Date;
  updatedAt: Date; */
}

interface RequestQuery {
  limit?: number;
  p;
}

interface RequestParams {
  _id: string;
  name?: string;
}

interface CustomRequest<T> extends Request {
  params: RequestParams;
  query?: RequestQuery;
  body: T;
}

interface CustomResponse {
  status: statusStr;
  message: string;
  data: any;
}

interface InvoiceDaysCalculator {
  firstDay: Date;
  lastDay: Date;
}

export type {
  InvoiceDaysCalculator,
  TrainerBodyCreating,
  UserBodyCreating,
  CustomResponse,
  IErrorHandler,
  RequestParams,
  CustomRequest,
  RequestQuery,
  InvoiceBody,
  TrainerBody,
  AmountBody,
  UserBody,
};

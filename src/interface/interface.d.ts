import e, { Request } from "express";
import { trainerPlan, statusStr, paymentMethod } from "../types/types";

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
  trainerId?: number;
  trainerDni?: string;
  trainerName?: string;
  lastUpdate: Date;
  phoneNumber: string;
  email: string;
  direction: string;
  invoicesArray?: any[];
  /*  createdAt: Date;
  updatedAt: Date; */
}

interface userCreated extends UserBody {
  paymentMethod: paymentMethod;
  comments?: string;
}

interface InvoiceBody {
  _id: number;
  invoiceId: string;
  userDni: string;
  userName: string;
  userLastName: string;
  trainerDni?: string;
  trainerName?: string;
  firstDate: Date;
  lastDate: Date;
  amount: number;
  plan: trainerPlan | string;
  phoneNumber: string;
  email: string;
  direction: string;
  minExchangeDollarValue: number;
  averageValue: number;
  maxExchangeDollarValue: number;
  paymentMethod: paymentMethod;
  comments?: string;
  // trainer_id?: number;
  // trainerLastName?: string;
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
  trainerId?: number;
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

interface AdminBody {
  _id: number; // This is not the client Id, it's just for the DB requeriments.
  adminDni: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  hasPermissions: boolean;
  isDeleted: boolean;
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
interface Datetime {
  date: string;
  time: string;
}
interface ExchangeMonitor {
  change: number;
  color: string;
  image: string;
  last_update: Date;
  percent: number;
  price: number;
  price_old: number;
  symbol: string;
  title: string;
}
interface Monitors {
  bcv: ExchangeMonitor;
  enparalelovzla: ExchangeMonitor;
}

interface DollarExchangeResponse {
  datetime: Datetime;
  monitors: Monitors;
}

export type {
  DollarExchangeResponse,
  InvoiceDaysCalculator,
  TrainerBodyCreating,
  UserBodyCreating,
  ExchangeMonitor,
  CustomResponse,
  IErrorHandler,
  RequestParams,
  CustomRequest,
  RequestQuery,
  userCreated,
  InvoiceBody,
  TrainerBody,
  AmountBody,
  AdminBody,
  UserBody,
  Monitors,
  Datetime,
};

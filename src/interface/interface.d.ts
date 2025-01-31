import { Request } from "express";

interface IErrorHandler {
  statusCode: number;
  message: string;
}

interface UserBody {
  client_id: number; // This is not the client Id, it's just for the DB requeriments.
  dni: number;
  name: string;
  weight: number;
  age: number;
  registration_date: Date;
  last_payment: Date;
  days_of_debt: number;
  trainer_id?: string;
  trainer_name?: string;
  last_updated: Date;
  invoices_id?: string;
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

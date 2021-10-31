import { Request } from "express";

export interface ICustomRequest extends Request {
  dbPath: string;
}

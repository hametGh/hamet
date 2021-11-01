import { Request, Response } from "express";
import Storage from "../../storage.js";

import { Transaction } from "../types/Transaction";
import { findTransaction } from "../../helper.js";

/**
 * find transaction
 * @param req Request
 * @param res Response
 */
export const find = async (req: Request, res: Response) => {
  // initial db
  const db = Storage(req.dbPath);
  await db.read();
  res.send({ sucess: true, data: db.data });
};

/**
 * find transaction by id
 * @param req Request
 * @param res Response
 */
export const findOne = async (req: Request, res: Response) => {
  // initial db
  const db = Storage(req.dbPath);
  await db.read();

  const { id } = req.params;

  let resualt = findTransaction(db.data, id);

  res.send({ sucess: true, data: resualt || [] });
};

/**
 * insert new transaction
 * @param req Request
 * @param res Response
 */
export const add = (req: Request, res: Response) => {};

/**
 * update transaction by id
 * @param req Request
 * @param res Response
 */
export const update = (req: Request, res: Response) => {};

/**
 * remove transaction by id
 * @param req Request
 * @param res Response
 */
export const remove = (req: Request, res: Response) => {};

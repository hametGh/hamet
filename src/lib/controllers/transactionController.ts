import { Request, Response } from "express";
import Storage, { insert, preInsert, modify, getOne } from "../../storage.js";

import { Transaction } from "../types/Transaction";

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

  // transaction id
  const { id } = req.params;

  // find transaction by id
  let resualt: Transaction = getOne(db, id);

  res.send({ sucess: true, data: resualt || [] });
};

/**
 * insert new transaction
 * @param req Request
 * @param res Response
 */
export const add = async (req: Request<{}, {}, Transaction>, res: Response) => {
  // initial db
  const db = Storage(req.dbPath);
  await db.read();

  let createdTransaction = await insert(db, req.body.path, preInsert(req.body));
  res.send({ sucess: true, data: createdTransaction });
};

/**
 * update transaction by id
 * @param req Request
 * @param res Response
 */
export const update = async (req: Request, res: Response) => {
  // initial db
  const db = Storage(req.dbPath);
  await db.read();

  // transaction id
  const { id } = req.params;

  // find transaction by id
  let transaction: Transaction = getOne(db, id);

  // update locally
  Object.assign(transaction, req.body);

  // update from db
  modify(db, id, transaction);

  res.send({ sucess: true, data: transaction });
};

/**
 * remove transaction by id
 * @param req Request
 * @param res Response
 */
export const remove = (req: Request, res: Response) => {};

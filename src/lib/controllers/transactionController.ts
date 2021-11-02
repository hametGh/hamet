import { Request, Response } from "express";
import Storage, {
  insert,
  preInsert,
  modify,
  getOne,
  deleteOne,
} from "../../storage.js";
import _ from "lodash";

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
  let transaction: Transaction = getOne(db, id);
  
  if (_.isEmpty(transaction))
    return res.send({ sucess: false, message: "transaction not found" });

  res.send({ sucess: true, data: transaction });
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
  if (_.isEmpty(transaction))
    return res.send({ sucess: false, message: "transaction not found" });

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
export const remove = async (req: Request, res: Response) => {
  // initial db
  const db = Storage(req.dbPath);
  await db.read();

  // transaction id
  const { id } = req.params;

  // find transaction by id
  let transaction: Transaction = getOne(db, id);

  if (_.isEmpty(transaction))
    return res.send({ sucess: false, message: "transaction not found" });

  await deleteOne(db, id);

  res.send({ sucess: true, data: transaction });
};

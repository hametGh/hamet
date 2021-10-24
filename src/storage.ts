import { join } from "path";
import { Low, JSONFile } from "lowdb";

import { Data } from "./lib/types";
import { Transaction } from "./lib/types/Transaction";

const Storage = (dbPath: string) => {
  const adapter = new JSONFile<Data>(join(dbPath));
  const db = new Low<Data>(adapter);
  db.data = db.data || {};
  return db;
};

/**
 * Add new transaction
 * @param db Low db
 * @param path String
 * @param transaction Transaction
 */
export const add = async (db: Low<Data>, path: string, t: Transaction) => {
  if (!db.data![path]) {
    db.data![path] = [t];
  } else {
    db.data![path].push(t);
  }
  await db.write();
};

/**
 * find transaction by path
 * @param db Low db
 * @param path String
 */
export const findByPath = async (db: Low<Data>, path: string) => {
  return db.data![path];
};

/**
 * find transaction by transaction id
 * @param db Low db
 * @param transactionId string
 */
export const findOne = async (db: Low<Data>, tId: string) => {
  let result;
  Object.keys(db.data!).forEach((property) => {
    result = db.data![property].filter((t) => t.id === tId);
  });
  return result;
};

/**
 * return all transactions
 * @param db Low db
 */
export const find = async (db: Low<Data>) => {
  let result;
  Object.keys(db.data!).forEach((property) => {
    db.data![property].forEach((t) => result.push(t));
  });
  return result;
};

/**
 * remove transaction by id
 * @param db Low db
 * @param transactionId string
 */
export const remove = async (db: Low<Data>, tId: string) => {};

/**
 * remove transaction by path
 * @param db Low db
 * @param path string
 */
export const removeByPath = async (db: Low<Data>, path: string) => {};

/**
 *
 * @param db Low db
 * @param transactionId string
 * @param transaction Transaction
 */
export const update = async (db: Low<Data>, tId: string, t: Transaction) => {};

/**
 *
 * @param db Low db
 */
export const read = async (db: Low<Data>) => {
  await db.read();
};

export default Storage;

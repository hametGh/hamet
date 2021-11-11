import { Request, Response, NextFunction } from "express";
import { Data } from "./lib/types/Index";
import { Low } from "lowdb";
import { read, findByPath } from "./storage.js";
import { filterByMethod, isTriggered } from "./helper.js";
import { Transaction } from "./lib/types/Transaction";

const middleware = (db: Low<Data>) => {
  // read database
  read(db).then();

  return async (req: Request, res: Response, next: NextFunction) => {
    // find transaction by path
    let transactions = await findByPath(db, req.path);

    // find transactions of current method
    let matchedTransactions: Transaction[] = filterByMethod(
      transactions,
      req.method
    );

    for (let transaction of matchedTransactions) {
      // skip this transaction because it's not triggered
      if (
        !transaction.enabled ||
        !isTriggered(transaction.trigger, transaction.triggerWhen, req)
      )
        continue;
    }

    next();
  };
};
export default middleware;

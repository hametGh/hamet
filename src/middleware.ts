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

    for (let t of matchedTransactions) {
      // skip this transaction because it's not triggered
      if (!t.enabled || !isTriggered(t.trigger, t.triggerWhen, req)) continue;

      // TODO do the action
    }

    console.log(req.query);

    next();
  };
};
export default middleware;

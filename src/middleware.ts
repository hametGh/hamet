import { Request, Response, NextFunction } from "express";
import { Low } from "lowdb";

// import types
import { Data } from "./lib/types/Index";
import { Transaction } from "./lib/types/Transaction";

// import functions
import { read, findByPath } from "./storage.js";
import { filterByMethod, isTriggered } from "./helper.js";

/**
 * middleware for checking requests, modifying response, and alerting
 * @param db Low<Data>
 */
const middleware = (db: Low<Data>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // read database
    await read(db);

    // find transaction by path
    let transactions = await findByPath(db, req.path);

    // find transactions of current method
    let matchedT: Transaction[] = filterByMethod(transactions, req.method);

    for (let t of matchedT) {
      // skip this transaction because it's not triggered
      if (!t.enabled || !isTriggered(t.trigger, t.triggerWhen, req)) continue;

      // call an action
      for (const action of t.action) {
        console.log(action);
        // if()
      }
    }

    next();
  };
};
export default middleware;

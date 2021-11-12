import { Request, Response, NextFunction } from "express";
import { Low } from "lowdb";

// import types
import { Transaction } from "./lib/types/Transaction";
import { Data } from "./lib/types/Index";

// import functions
import { filterByMethod, isTriggered, alert } from "./helper.js";
import { read, findByPath } from "./storage.js";

// import enums
import { ActionType } from "./lib/enums/index.js";

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
        // if action type is alert then call an alert!
        if (action.enabled && action.type === ActionType.ALERT) {
          alert(action?.alert[0]);
        }
        // if action type is modify then modify request or respone
        else {
          // TODO should modify request or response here
        }
      }
    }

    next();
  };
};
export default middleware;

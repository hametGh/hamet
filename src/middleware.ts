import { Request, Response, NextFunction } from "express";
import { Data } from "./lib/types/Index";
import { Low } from "lowdb";
import { read, findByPath } from "./storage.js";
import { filterByMethod, isTriggered } from "./helper.js";
import { Transaction } from "./lib/types/Transaction";

const middleware = (db: Low<Data>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // read database
    console.time("reading local database");
    await read(db);
    console.timeEnd("reading local database");

    // find transaction by path
    let transactions = await findByPath(db, req.path);

    // find transactions of current method
    let matchedT: Transaction[] = filterByMethod(transactions, req.method);

    for (let t of matchedT) {
      // skip this transaction because it's not triggered
      if (!t.enabled || !isTriggered(t.trigger, t.triggerWhen, req)) continue;

      // TODO call action here
      console.log("should call an action");
    }

    console.log(req.cookies);

    next();
  };
};
export default middleware;

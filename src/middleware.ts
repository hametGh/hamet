import { Request, Response, NextFunction } from "express";
import { Data } from "./models/Transaction";
import { Low } from "lowdb";
import { add, read, findByPath } from "./storage.js";

const middleware = (db: Low<Data>) => {
  // read database
  read(db).then();

  return async (req: Request, res: Response, next: NextFunction) => {
    // await add(db, "/user", { id: "123", type: "DELETE" });

    let transactions = await findByPath(db, "/user");
    console.log(transactions);

    next();
  };
};
export default middleware;

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { Options } from "../types/Options";

export const verifyToken = (options: Options) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.query["t"] as string;
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }

    req.dbPath = options.dbPath;

    try {
      // TODO decode token
      // const decoded = jwt.verify(token, "");
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  };
};

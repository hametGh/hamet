import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// import { SERVICES_TOKEN_KEY } from "../config";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.query["t"] as string;

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    // const decoded = jwt.verify(token, "");
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

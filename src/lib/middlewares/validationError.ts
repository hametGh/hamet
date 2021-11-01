import { Request, Response, NextFunction } from "express";
import { ValidationError } from "express-json-validator-middleware";

/**
 * validation error middleware
 * @param error error object
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export const validationErrorMiddleware = (
  error: any,
  reg: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(error);
  }

  const isValidationError = error instanceof ValidationError;
  if (!isValidationError) {
    return next(error);
  }

  res.status(400).json({
    errors: error.validationErrors,
  });

  next();
};

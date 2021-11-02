import express from "express";
import { Validator } from "express-json-validator-middleware";

import { createTransaction, updateTransaction } from "./validate.js";
const router = express.Router();

// import controller methods
import {
  find,
  findOne,
  add,
  update,
  remove,
} from "./lib/controllers/transactionController.js";

/**
 * Initialize a `Validator` instance
 */
const { validate } = new Validator({});

// find transaction
router.get("/transaction", find);

// find transaction by id
router.get("/transaction/:id", findOne);

// insert new transaction
router.post("/transaction", validate({ body: createTransaction as any }), add);

// update transaction by id
router.put(
  "/transaction/:id",
  validate({ body: updateTransaction as any }),
  update
);

// remove transaction by id
router.delete("/transaction/:id", remove);

export default router;

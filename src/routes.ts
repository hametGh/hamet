import express from "express";
const router = express.Router();

import {
  add,
  find,
  findOne,
  update,
  remove,
} from "./lib/controllers/transactionController";

// find transaction
router.get("/transaction", find);

// find transaction by id
router.get("/transaction/:id", findOne);

// insert new transaction
router.post("/transaction", add);

// update transaction by id
router.put("/transaction/:id", update);

// remove transaction by id
router.delete("/transaction/:id", remove);

export default router;

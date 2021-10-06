import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("home page");
});

export default router;

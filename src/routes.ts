import express from "express";
const router = express.Router();

 
router.get("/transaction", (req, res) => {
  res.send("home page");
});
router.get("/transaction/:id", (req, res) => {
  res.send("home page");
});
router.post("/transaction", (req, res) => {
  res.send("home page");
});
router.put("/transaction", (req, res) => {
  res.send("home page");
});
router.delete("/transaction", (req, res) => {
  res.send("home page");
});

export default router;

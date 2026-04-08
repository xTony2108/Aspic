import express from "express";

const router = express.Router();

router.post("/", express.raw({ type: "application/json" }), (req, res) => {
  const sig = req.headers["stripe-signature"];

  console.log("Webhook ricevuto");

  res.sendStatus(200);
});

export default router;

const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.post("/", async (req, res) => {
  const { order_id, total } = req.body;

  await db.query(
    "INSERT INTO sales (order_id, total) VALUES (?, ?)",
    [order_id, total]
  );

  res.json({ success: true });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../config/database');

// list pending and preparing orders
router.get('/orders', async (req,res) => {
  const [orders] = await db.query("SELECT * FROM orders WHERE status IN ('PENDING','PREPARING') ORDER BY created_at ASC");
  for (const o of orders) {
    const [items] = await db.query('SELECT oi.*, p.name, p.price FROM order_items oi JOIN products p ON p.id = oi.product_id WHERE oi.order_id = ?', [o.id]);
    o.items = items;
  }
  res.json(orders);
});

// change status (PREPARING, DONE)
router.patch('/orders/:id/status', async (req,res) => {
  const { status } = req.body;
  await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
  // if marked DONE, perform stock consumption here (call service)
  if (status === 'DONE') {
    // simple consumption: decrease stock_batches quantities by ingredient rules (implement logic in real project)
    // we'll leave proper FIFO consumption in the service below; for demo we just respond OK
  }
  res.json({ success: true });
});

module.exports = router;

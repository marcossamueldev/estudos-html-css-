const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Create order (items = [{ product_id, quantity }])
router.post('/', async (req,res) => {
  const { items } = req.body;
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const [r] = await conn.query("INSERT INTO orders (status) VALUES ('PENDING')");
    const orderId = r.insertId;
    for (const it of items) {
      await conn.query("INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)", [orderId, it.id || it.product_id, it.quantity || 1]);
    }
    await conn.commit();
    res.status(201).json({ id: orderId });
  } catch(err){
    await conn.rollback();
    console.error(err);
    res.status(500).json({ error: 'Erro criando pedido' });
  } finally {
    conn.release();
  }
});

router.get('/', async (req,res) => {
  const dbConn = require('../config/database');
  const [orders] = await dbConn.query('SELECT * FROM orders ORDER BY created_at DESC');
  // include items
  for (const o of orders) {
    const [items] = await dbConn.query('SELECT oi.*, p.name, p.price FROM order_items oi JOIN products p ON p.id = oi.product_id WHERE oi.order_id = ?', [o.id]);
    o.items = items;
  }
  res.json(orders);
});

router.put('/:id', async (req,res) => {
  const { status } = req.body;
  await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
  res.json({ success: true });
});

module.exports = router;

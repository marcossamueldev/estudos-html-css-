const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', async (req,res) => {
  const [rows] = await db.query('SELECT sb.*, i.name as ingredient_name FROM stock_batches sb JOIN ingredients i ON i.id = sb.ingredient_id');
  res.json(rows);
});

router.post('/', async (req,res) => {
  const { ingredient_id, quantity, unit_cost, expiration_date } = req.body;
  const [r] = await db.query('INSERT INTO stock_batches (ingredient_id, quantity, unit_cost, expiration_date) VALUES (?, ?, ?, ?)', [ingredient_id, quantity, unit_cost, expiration_date]);
  res.status(201).json({ id: r.insertId });
});

module.exports = router;

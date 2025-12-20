const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/alerts', async (req,res) => {
  // sum current stock per ingredient
  const [rows] = await db.query(`
    SELECT i.id, i.name, i.minimum_stock, COALESCE(SUM(sb.quantity),0) AS current_stock, IFNULL(i.unit_cost,0) as unit_cost
    FROM ingredients i
    LEFT JOIN stock_batches sb ON sb.ingredient_id = i.id
    GROUP BY i.id
    HAVING current_stock < i.minimum_stock
  `);

  const out = rows.map(r => ({
    ingredient: r.name,
    current_quantity: Number(r.current_stock),
    min_quantity: Number(r.minimum_stock),
    potential_loss: Number(((r.minimum_stock - r.current_stock) * r.unit_cost).toFixed(2))
  }));

  res.json(out);
});

module.exports = router;

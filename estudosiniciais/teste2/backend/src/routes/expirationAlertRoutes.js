const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/expiration', async (req,res) => {
  const [rows] = await db.query(`
    SELECT i.name as ingredient, sb.quantity, sb.unit_cost, sb.expiration_date,
      DATEDIFF(sb.expiration_date, CURDATE()) AS days_to_expire
    FROM stock_batches sb
    JOIN ingredients i ON i.id = sb.ingredient_id
    WHERE sb.quantity > 0 AND sb.expiration_date IS NOT NULL
    ORDER BY sb.expiration_date ASC
  `);

  const alerts = rows.map(r => ({
    ingredient: r.ingredient,
    quantity: Number(r.quantity),
    unit_cost: Number(r.unit_cost),
    expiration_date: r.expiration_date,
    days_to_expire: Number(r.days_to_expire),
    loss: r.days_to_expire < 0 ? Number(r.quantity) * Number(r.unit_cost) : 0
  }));

  res.json(alerts);
});

module.exports = router;

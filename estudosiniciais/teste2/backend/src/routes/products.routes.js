const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', async (req,res) => {
  const [rows] = await db.query('SELECT * FROM products');
  res.json(rows);
});

module.exports = router;

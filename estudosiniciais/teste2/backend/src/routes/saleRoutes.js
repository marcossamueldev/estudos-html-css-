const express = require('express');
const router = express.Router();
const SaleController = require('../controllers/SaleController');

router.post('/', SaleController.sellProduct);

module.exports = router;

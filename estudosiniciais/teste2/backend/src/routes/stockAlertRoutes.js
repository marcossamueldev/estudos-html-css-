const express = require('express');
const StockAlertController = require('../controllers/StockAlertController');

const router = express.Router();

router.get('/alerts', StockAlertController.getAlerts);

module.exports = router;

const express = require('express');
const router = express.Router();
const StockBatchController = require('../controllers/StockBatchController');

router.post('/', StockBatchController.create);

module.exports = router;

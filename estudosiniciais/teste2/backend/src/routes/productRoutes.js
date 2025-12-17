const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

router.get('/:id/cost', ProductController.getProductCost);

module.exports = router;

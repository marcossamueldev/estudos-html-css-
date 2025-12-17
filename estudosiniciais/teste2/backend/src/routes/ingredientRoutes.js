const express = require('express');
const router = express.Router();
const IngredientController = require('../controllers/IngredientController');

router.get('/', IngredientController.listIngredients);

module.exports = router;

const IngredientModel = require('../models/IngredientModel');

async function listIngredients(req, res) {
  try {
    // temporário: restaurant_id fixo
    const restaurantId = 1;

    const ingredients = await IngredientModel.getAllIngredients(restaurantId);
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listIngredients
};

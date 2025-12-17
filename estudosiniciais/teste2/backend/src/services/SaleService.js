const db = require('../config/database');
const StockFifoService = require('./StockFifoService');

async function processSale(productId) {
  const [ingredients] = await db.query(`
    SELECT ingredient_id, quantity
    FROM product_ingredients
    WHERE product_id = ?
  `, [productId]);

  if (ingredients.length === 0) {
    throw new Error('Produto sem ingredientes cadastrados');
  }

  let totalCost = 0;

  for (const item of ingredients) {
    const cost = await StockFifoService.consumeIngredientFIFO(
      item.ingredient_id,
      item.quantity
    );
    totalCost += cost;
  }

  return {
    productId,
    totalCost
  };
}

module.exports = {
  processSale
};

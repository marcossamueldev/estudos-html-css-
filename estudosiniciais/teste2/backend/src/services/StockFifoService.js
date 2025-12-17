const db = require('../config/database');

async function consumeIngredientFIFO(ingredientId, quantityNeeded) {
  let remaining = quantityNeeded;
  let totalCost = 0;

  const [batches] = await db.query(`
    SELECT * FROM stock_batches
    WHERE ingredient_id = ?
    AND quantity > 0
    ORDER BY created_at ASC
  `, [ingredientId]);

  for (const batch of batches) {
    if (remaining <= 0) break;

    const consume = Math.min(batch.quantity, remaining);

    await db.query(
      'UPDATE stock_batches SET quantity = quantity - ? WHERE id = ?',
      [consume, batch.id]
    );

    totalCost += consume * batch.unit_cost;
    remaining -= consume;
  }

  if (remaining > 0) {
    throw new Error('Estoque insuficiente');
  }

  return totalCost;
}

module.exports = {
  consumeIngredientFIFO
};

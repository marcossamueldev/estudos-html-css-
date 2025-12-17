const db = require('../config/database');

async function calculateProductCost(productId) {

  // 1. Custo dos ingredientes
  const [ingredients] = await db.query(`
    SELECT 
      SUM(pi.quantity * i.unit_cost) AS ingredient_cost
    FROM product_ingredients pi
    JOIN ingredients i ON i.id = pi.ingredient_id
    WHERE pi.product_id = ?
  `, [productId]);

  const ingredientCost = ingredients[0].ingredient_cost || 0;

  // 2. Custo fixo unitário
  const [fixed] = await db.query(`
    SELECT 
      SUM(fc.monthly_value) / SUM(pv.monthly_quantity) AS fixed_cost
    FROM fixed_costs fc
    JOIN production_volume pv
    WHERE pv.product_id = ?
  `, [productId]);

  const fixedCost = fixed[0].fixed_cost || 0;

  // 3. Custo de mão de obra (simplificado)
  const [labor] = await db.query(`
    SELECT 
      SUM(e.monthly_salary / e.monthly_hours) AS labor_cost
    FROM employees e
  `);

  const laborCost = labor[0].labor_cost || 0;

  const realCost = ingredientCost + fixedCost + laborCost;
  const suggestedPrice = realCost * 2;

  return {
    ingredientCost,
    fixedCost,
    laborCost,
    realCost,
    suggestedPrice
  };
}

module.exports = {
  calculateProductCost
};

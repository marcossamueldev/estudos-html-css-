const db = require('../config/database');
const ExpirationService = require('./ExpirationService');

async function createBatch({ ingredientId, quantity, unitCost }) {
  const createdAt = new Date();

  // calcular validade automática
  const expirationDate = await ExpirationService.applyExpiration(
    ingredientId,
    createdAt
  );

  const [result] = await db.query(
    `
    INSERT INTO stock_batches
      (ingredient_id, quantity, unit_cost, expiration_date, created_at)
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      ingredientId,
      quantity,
      unitCost,
      expirationDate,
      createdAt
    ]
  );

  return {
    id: result.insertId,
    ingredientId,
    quantity,
    unitCost,
    expirationDate
  };
}

module.exports = {
  createBatch
};

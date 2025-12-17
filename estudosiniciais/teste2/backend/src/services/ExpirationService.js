const db = require('../config/database');

async function applyExpiration(ingredientId, createdAt) {
  const [rules] = await db.query(`
    SELECT hours_valid
    FROM expiration_rules
    WHERE ingredient_id = ?
  `, [ingredientId]);

  if (rules.length === 0) return null;

  const hours = rules[0].hours_valid;
  const expiration = new Date(createdAt);
  expiration.setHours(expiration.getHours() + hours);

  return expiration;
}

module.exports = {
  applyExpiration
};

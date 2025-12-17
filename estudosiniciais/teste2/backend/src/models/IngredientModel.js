const db = require('../config/database');

async function getAllIngredients(restaurantId) {
  const [rows] = await db.query(
    'SELECT * FROM ingredients WHERE restaurant_id = ?',
    [restaurantId]
  );
  return rows;
}

module.exports = {
  getAllIngredients
};

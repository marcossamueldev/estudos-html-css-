const db = require('../config/database');


class StockService {
  static async getLowStockItems() {
    const [rows] = await db.query(`
      SELECT 
        i.id AS ingredient_id,
        i.name,
        i.minimum_stock,
        COALESCE(SUM(sb.quantity), 0) AS current_stock,
        i.unit_cost
      FROM ingredients i
      LEFT JOIN stock_batches sb 
        ON sb.ingredient_id = i.id
      GROUP BY i.id
      HAVING current_stock < i.minimum_stock
    `);

    return rows.map(item => ({
      ...item,
      missing_quantity: item.minimum_stock - item.current_stock
    }));
  }
}

module.exports = StockService;

const db = require("../config/database");

class StockAlertService {
  static async getLowStockIngredients() {
    const [rows] = await db.query(`
      SELECT 
        id,
        name,
        current_stock,
        minimum_stock,
        unit_cost,
        (minimum_stock - current_stock) AS missing_quantity
      FROM ingredients
      WHERE current_stock < minimum_stock
    `);

    return rows;
  }
}

module.exports = StockAlertService;

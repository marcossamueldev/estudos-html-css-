const db = require("../config/database");

class ExpirationAlertService {
  static async getExpirationAlerts() {
    const [rows] = await db.query(`
      SELECT 
        i.name AS ingredient,
        sb.quantity,
        sb.expiration_date,
        DATEDIFF(sb.expiration_date, CURDATE()) AS days_to_expire,
        i.unit_cost,
        CASE 
          WHEN DATEDIFF(sb.expiration_date, CURDATE()) < 0 
          THEN sb.quantity * i.unit_cost
          ELSE 0
        END AS loss
      FROM stock_batches sb
      JOIN ingredients i ON i.id = sb.ingredient_id
      WHERE DATEDIFF(sb.expiration_date, CURDATE()) <= 7
    `);

    return rows;
  }
}

module.exports = ExpirationAlertService;

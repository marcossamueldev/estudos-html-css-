const db = require('../config/database');

class ExpirationAlertService {
  static async getExpirationAlerts() {
    const query = `
      SELECT 
        i.name AS ingredient,
        b.quantity,
        b.expiration_date,
        DATEDIFF(b.expiration_date, CURDATE()) AS days_to_expire
      FROM stock_batches b
      JOIN ingredients i ON i.id = b.ingredient_id
      WHERE b.expiration_date <= DATE_ADD(CURDATE(), INTERVAL 1 DAY)
    `;

    const [rows] = await db.query(query);
    return rows;
  }
}

module.exports = ExpirationAlertService;

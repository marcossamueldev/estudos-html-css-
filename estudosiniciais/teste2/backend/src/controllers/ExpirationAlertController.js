const db = require("../config/database");

class ExpirationAlertController {
  static async getExpirationAlerts(req, res) {
    try {
      const [rows] = await db.query(`
        SELECT 
          i.name AS ingredient,
          sb.quantity,
          sb.expiration_date,
          DATEDIFF(sb.expiration_date, CURDATE()) AS days_to_expire,
          IFNULL(i.unit_cost, 0) AS unit_cost
        FROM stock_batches sb
        JOIN ingredients i ON i.id = sb.ingredient_id
        WHERE sb.quantity > 0
        ORDER BY sb.expiration_date ASC
      `);

      const alerts = rows.map(item => ({
        ingredient: item.ingredient,
        quantity: Number(item.quantity),
        expiration_date: item.expiration_date,
        days_to_expire: Number(item.days_to_expire),
        unit_cost: Number(item.unit_cost),
        loss:
          item.days_to_expire < 0
            ? Number(item.quantity) * Number(item.unit_cost)
            : 0
      }));

      return res.json(alerts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar alertas" });
    }
  }
}

module.exports = ExpirationAlertController;

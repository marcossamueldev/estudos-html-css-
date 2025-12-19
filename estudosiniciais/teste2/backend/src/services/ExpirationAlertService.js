const db = require('../config/database');

class ExpirationAlertService {
  static async getExpirationAlerts() {
    const query = ` 
    SELECT 
  i.name AS ingredient,
  sb.quantity,
  sb.expiration_date,
  i.unit_cost,
  DATEDIFF(sb.expiration_date, CURDATE()) AS days_to_expire
FROM stock_batches sb
JOIN ingredients i ON i.id = sb.ingredient_id
WHERE sb.expiration_date <= DATE_ADD(CURDATE(), INTERVAL 7 DAY)
`;
    const alertsWithLoss = alerts.map(item => {
      const loss =
        item.days_to_expire <= 0
          ? item.quantity * item.unit_cost
          : 0;

      return {
        ...item,
        loss: Number(loss.toFixed(2)),
      };
    });
    return alertsWithLoss;
  }
}

module.exports = ExpirationAlertService;

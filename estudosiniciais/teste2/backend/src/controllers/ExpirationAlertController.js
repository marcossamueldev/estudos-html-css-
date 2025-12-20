const ExpirationAlertService = require("../services/ExpirationAlertService");

class ExpirationAlertController {
  static async getAlerts(req, res) {
    try {
      const alerts = await ExpirationAlertService.getExpirationAlerts();
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar alertas" });
    }
  }
}

module.exports = ExpirationAlertController;

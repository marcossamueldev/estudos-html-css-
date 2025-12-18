const ExpirationAlertService = require("../services/ExpirationAlertService");

class ExpirationAlertController {
  static async index(req, res) {
    try {
      const alerts = await ExpirationAlertService.getExpirationAlerts();
      return res.json(alerts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar alertas de validade" });
    }
  }
}

module.exports = ExpirationAlertController;

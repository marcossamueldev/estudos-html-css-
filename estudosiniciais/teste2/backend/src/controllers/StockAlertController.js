const StockService = require('../services/StockService');
const LossCalculationService = require('../services/LossCalculationService');


class StockAlertController {
  static async getAlerts(req, res) {
    try {
      const lowStockItems = await StockService.getLowStockItems();
      const lossReport = LossCalculationService.calculatePotentialLoss(lowStockItems);

      res.json({
        total_items_at_risk: lossReport.length,
        total_potential_loss: lossReport.reduce(
          (sum, item) => sum + item.potential_loss,
          0
        ),
        items: lossReport
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao gerar alertas de estoque' });
    }
  }
}

module.exports = StockAlertController;

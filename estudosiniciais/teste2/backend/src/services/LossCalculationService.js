class LossCalculationService {
  static calculatePotentialLoss(lowStockItems) {
    return lowStockItems.map(item => {
      const missingQuantity = Math.max(
        Number(item.minimum_stock) - Number(item.current_stock),
        0
      );

      const potentialLoss =
        missingQuantity * Number(item.unit_cost);

      return {
        ingredient_id: item.id,
        name: item.name,
        current_stock: item.current_stock,
        minimum_stock: item.minimum_stock,
        unit_cost: item.unit_cost,
        missing_quantity: missingQuantity,
        potential_loss: Number(potentialLoss.toFixed(2))
      };
    });
  }
}

module.exports = LossCalculationService;

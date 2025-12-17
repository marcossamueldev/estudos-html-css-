const ProductCostService = require('../services/ProductCostService');

async function getProductCost(req, res) {
  try {
    const { id } = req.params;
    const cost = await ProductCostService.calculateProductCost(id);
    res.json(cost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getProductCost
};

const StockBatchService = require('../services/StockBatchService');

async function create(req, res) {
  try {
    const { ingredientId, quantity, unitCost } = req.body;

    if (!ingredientId || !quantity || !unitCost) {
      return res.status(400).json({
        error: 'ingredientId, quantity e unitCost são obrigatórios'
      });
    }

    const batch = await StockBatchService.createBatch({
      ingredientId,
      quantity,
      unitCost
    });

    res.status(201).json(batch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  create
};

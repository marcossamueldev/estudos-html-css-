const SaleService = require('../services/SaleService');

async function sellProduct(req, res) {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ error: 'productId é obrigatório' });
    }

    const result = await SaleService.processSale(productId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  sellProduct
};

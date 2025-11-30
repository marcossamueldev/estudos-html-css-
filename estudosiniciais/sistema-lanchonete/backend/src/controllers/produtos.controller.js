// backend/src/controllers/produtos.controller.js
const Produtos = require("../models/produtos");

module.exports = {
  listarProdutos: async (req, res) => {
    try {
      const produtos = await Produtos.listar();
      res.json(produtos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar produtos" });
    }
  },

  buscarProduto: async (req, res) => {
    try {
      const produto = await Produtos.buscarPorId(req.params.id);
      if (!produto) return res.status(404).json({ error: "Produto não encontrado" });
      res.json(produto);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar produto" });
    }
  }
};

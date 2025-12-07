const Produto = require('../models/Produto');

module.exports = {
  
  // Criar produto
  async criar(req, res) {
    try {
      const { nome, preco, categoria } = req.body;

      const novo = await Produto.create({ nome, preco, categoria });

      return res.json(novo);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  // Listar produtos
  async listar(req, res) {
    const produtos = await Produto.findAll();
    return res.json(produtos);
  },

  // Editar produto
  async editar(req, res) {
    try {
      const { id } = req.params;
      const { nome, preco, categoria } = req.body;

      await Produto.update(
        { nome, preco, categoria },
        { where: { id } }
      );

      return res.json({ message: "Produto atualizado" });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  // Deletar produto
  async deletar(req, res) {
    try {
      const { id } = req.params;

      await Produto.destroy({ where: { id } });

      return res.json({ message: "Produto removido" });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

};

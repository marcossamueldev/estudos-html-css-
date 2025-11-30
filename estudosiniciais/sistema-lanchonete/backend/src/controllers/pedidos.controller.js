// backend/src/controllers/pedidos.controller.js
const Pedidos = require("../models/pedidos");
const OrderItems = require("../models/order_items");

module.exports = {
  criarPedido: async (req, res) => {
    try {
      const { cliente_nome, total, itens } = req.body;

      if (!itens || !Array.isArray(itens) || itens.length === 0) {
        return res.status(400).json({ erro: "O pedido precisa ter itens." });
      }

      // criar pedido principal
      const result = await Pedidos.criar(cliente_nome, total);
      const pedido_id = result.insertId;

      // inserir itens (serialmente)
      for (const item of itens) {
        await OrderItems.criar(
          pedido_id,
          item.produto_id,
          item.quantidade,
          item.observacao || ""
        );
      }

      res.json({ mensagem: "Pedido criado com sucesso!", pedido_id });
    } catch (erro) {
      console.error("Erro ao criar pedido:", erro);
      res.status(500).json({ erro: "Erro ao criar pedido" });
    }
  },

  listarPedidos: async (req, res) => {
    try {
      const pedidos = await Pedidos.listar();
      res.json(pedidos);
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao listar pedidos" });
    }
  },

  buscarPedido: async (req, res) => {
    try {
      const id = req.params.id;
      const pedido = await Pedidos.buscarPorId(id);

      if (!pedido || pedido.length === 0) {
        return res.status(404).json({ erro: "Pedido não encontrado" });
      }

      const itens = await OrderItems.listarPorPedido(id);

      res.json({
        pedido: pedido[0],
        itens
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao buscar pedido" });
    }
  }
};

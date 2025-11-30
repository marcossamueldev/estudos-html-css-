// backend/src/models/order_items.js
const db = require("../../db");

const OrderItems = {
  criar: async (pedido_id, produto_id, quantidade, observacao) => {
    const sql = `
      INSERT INTO order_items (pedido_id, produto_id, quantidade, observacao)
      VALUES (?, ?, ?, ?)
    `;
    await db.query(sql, [pedido_id, produto_id, quantidade, observacao]);
  },

  listarPorPedido: async (pedido_id) => {
    const sql = `
      SELECT oi.*, p.nome AS produto_nome, p.preco AS produto_preco
      FROM order_items oi
      JOIN produtos p ON p.id = oi.produto_id
      WHERE oi.pedido_id = ?
    `;
    const [rows] = await db.query(sql, [pedido_id]);
    return rows;
  }
};

module.exports = OrderItems;

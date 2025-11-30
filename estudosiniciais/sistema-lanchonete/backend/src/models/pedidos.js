// backend/src/models/pedidos.js
const db = require("../../db");

module.exports = {
  criar: async (cliente_nome, total) => {
    const [result] = await db.query(
      "INSERT INTO pedidos (cliente_nome, total) VALUES (?, ?)",
      [cliente_nome, total]
    );
    return result; // result.insertId usado pelo controller
  },

  listar: async () => {
    const [rows] = await db.query("SELECT * FROM pedidos ORDER BY id DESC");
    return rows;
  },

  buscarPorId: async (id) => {
    const [rows] = await db.query("SELECT * FROM pedidos WHERE id = ?", [id]);
    return rows;
  }
};

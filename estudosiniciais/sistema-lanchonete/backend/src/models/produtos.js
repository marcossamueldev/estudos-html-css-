// backend/src/models/produtos.js
const db = require("../../db");

module.exports = {
  listar: async () => {
    const [rows] = await db.query("SELECT * FROM produtos");
    return rows;
  },

  buscarPorId: async (id) => {
    const [rows] = await db.query("SELECT * FROM produtos WHERE id = ?", [id]);
    return rows[0];
  },

  criar: async ({ nome, preco, imagem }) => {
    const [result] = await db.query(
      "INSERT INTO produtos (nome, preco, imagem) VALUES (?, ?, ?)",
      [nome, preco, imagem]
    );
    return result;
  }
};

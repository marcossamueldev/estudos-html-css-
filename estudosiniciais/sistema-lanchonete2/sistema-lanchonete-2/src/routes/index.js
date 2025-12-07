const express = require('express');
const router = express.Router();

// Controllers
const produtoController = require('../controllers/produtoController');

// Rota inicial
router.get("/", (req, res) => {
  res.json({ message: "API do sistema lanchonete funcionando!" });
});

// Rotas de produtos
router.post("/produtos", produtoController.criar);
router.get("/produtos", produtoController.listar);
router.put("/produtos/:id", produtoController.editar);
router.delete("/produtos/:id", produtoController.deletar);

module.exports = router;

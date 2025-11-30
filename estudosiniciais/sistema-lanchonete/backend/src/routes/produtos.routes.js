// backend/src/routes/produtos.routes.js
const express = require("express");
const router = express.Router();
const produtosController = require("../controllers/produtos.controller");

router.get("/", produtosController.listarProdutos);
router.get("/:id", produtosController.buscarProduto);

module.exports = router;

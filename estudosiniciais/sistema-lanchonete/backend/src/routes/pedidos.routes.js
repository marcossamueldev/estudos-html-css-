// backend/src/routes/pedidos.routes.js
const express = require("express");
const router = express.Router();
const pedidosController = require("../controllers/pedidos.controller");

router.post("/", pedidosController.criarPedido);
router.get("/", pedidosController.listarPedidos);
router.get("/:id", pedidosController.buscarPedido);

module.exports = router;

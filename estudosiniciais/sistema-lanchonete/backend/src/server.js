// backend/src/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const produtosRoutes = require("./routes/produtos.routes");
const pedidosRoutes = require("./routes/pedidos.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/produtos", produtosRoutes);
app.use("/pedidos", pedidosRoutes);

app.get("/", (req, res) => {
  res.send("API da Lanchonete ON");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

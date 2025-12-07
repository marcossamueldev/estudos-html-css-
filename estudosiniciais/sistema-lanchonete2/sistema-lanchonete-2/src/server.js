const express = require('express');
const app = express();
require('dotenv').config();
const sequelize = require('./database/db');

// Middleware para aceitar JSON
app.use(express.json());

// Rotas
const routes = require('./routes');
app.use(routes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log("Tabelas sincronizadas");
  app.listen(PORT, () => {
    console.log("Servidor rodando na porta " + PORT);
  });
});

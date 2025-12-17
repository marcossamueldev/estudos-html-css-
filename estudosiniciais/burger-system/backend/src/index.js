require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Rota inicial
app.get('/', (req, res) => {
  res.send("API funcionando");
});

// Iniciar servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});

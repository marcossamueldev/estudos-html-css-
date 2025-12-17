const express = require('express');
const cors = require('cors');
require('dotenv').config();
const saleRoutes = require('./routes/saleRoutes');



const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/sales', saleRoutes);


// Rota de teste
app.get('/', (req, res) => {
  res.send('API do Sistema de Restaurante rodando corretamente');
});
const productRoutes = require('./routes/productRoutes');

app.use('/products', productRoutes);


const db = require('./config/database');

app.get('/test-db', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({ success: true, message: 'Conexão com MySQL funcionando' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Porta
const PORT = process.env.PORT || 3001;
const ingredientRoutes = require('./routes/ingredientRoutes');

app.use('/ingredients', ingredientRoutes);

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

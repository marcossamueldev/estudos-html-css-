const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const kitchenRoutes = require('./routes/kitchenRoutes');
const stockBatchRoutes = require('./routes/stockBatchRoutes');
const expirationAlertRoutes = require('./routes/expirationAlertRoutes');
const stockAlertRoutes = require('./routes/stockAlertRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/kitchen', kitchenRoutes);
app.use('/batches', stockBatchRoutes);
app.use('/alerts', expirationAlertRoutes);
app.use('/stock', stockAlertRoutes);

app.get('/health', (req,res) => res.json({status:'ok'}));

module.exports = app;

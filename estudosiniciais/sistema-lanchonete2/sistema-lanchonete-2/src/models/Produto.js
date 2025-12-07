const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Produto = sequelize.define('Produto', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'produtos'
});

module.exports = Produto;

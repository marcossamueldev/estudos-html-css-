const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log("LENDO .env ->", {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS ? "***" : "(vazio)",
  DB_NAME: process.env.DB_NAME
});

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("MySQL conectado com sucesso");
  } catch (err) {
    console.error("Erro ao conectar MySQL:", err.message);
  }
}

testConnection();

module.exports = sequelize;

// backend/test-db.js
const db = require("../db");

async function test() {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    console.log("DB conectado. Test result:", rows);
  } catch (err) {
    console.error("Erro ao testar DB:", err);
  } finally {
    process.exit();
  }
}

test();

// const fs = require('fs');
// const path = require('path');
// const mysql = require('mysql2/promise');
// require('dotenv').config();

// (async () => {
//   const connection = await mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
//   });

//   const migrationDir = path.join(__dirname, '..', 'migrations');
//   const files = fs.readdirSync(migrationDir).sort();

//   for (const file of files) {
//     const filePath = path.join(migrationDir, file);
//     const sql = fs.readFileSync(filePath, 'utf8');

//     console.log(`Executando: ${file}`);
//     try {
//       await connection.query(sql);
//       console.log(`Sucesso: ${file}`);
//     } catch (err) {
//       console.error(`Erro em ${file}:`, err.message);
//     }
//   }

//   await connection.end();
// })();

// ----------------------- segunda parte -------------------------------------------------

// const fs = require('fs');
// const path = require('path');
// const mysql = require('mysql2/promise');
// require('dotenv').config();

// async function runMigrations() {
//   const connection = await mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
//   });

//   const migrationDir = path.join(__dirname, '..', 'migrations');
//   const files = fs.readdirSync(migrationDir).sort();

//   for (const file of files) {
//     const filePath = path.join(migrationDir, file);
//     const sql = fs.readFileSync(filePath, 'utf8');

//     console.log(`🔄 Executando: ${file}`);
//     try {
//       await connection.query(sql);
//       console.log(`Sucesso: ${file}`);
//     } catch (err) {
//       console.error(`Erro em ${file}:`, err.message);
//     }
//   }

//   await connection.end();
// }

// module.exports = runMigrations;

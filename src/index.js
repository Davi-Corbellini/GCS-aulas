const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const tarefaRoutes = require('./tarefaRoutes.js');
app.use('/', tarefaRoutes);

let server = null;
if (require.main === module) {
  const PORT = 3000;
  server = app.listen(PORT, () => {
    console.log(`Servidor rodando em http://${process.env.HOST}:${PORT}`);
    //console.log("Servidor rodando")
  });
}

module.exports = { app, server };

//--------------------------------------------------------------------------------------------------------------

//tentativa liquibase

// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// require('dotenv').config();

// const { Liquibase, MYSQL_DEFAULT_CONFIG } = require('liquibase');

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.static(__dirname));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// const tarefaRoutes = require('./tarefaRoutes.js');
// app.use('/', tarefaRoutes);

// let server = null;

// async function iniciarServidor() {
//   try {
//     const liquibase = new Liquibase({
//       classpath: './db/mysql-connector-j-8.0.jar', // onde fica o driver JDBC
//       liquibase: 'liquibase.integration.commandline.Main', // classe Java principal
//       driver: 'com.mysql.cj.jdbc.Driver', // driver JDBC do MySQL
//       logLevel: 'info', // nível de log
//       changeLogFile: './db/changelog/db.changelog-master.xml', // caminho para seu changelog
//       url: `jdbc:mysql://${process.env.HOST}:3306/${process.env.DATABASE}`,
//       username: `${process.env.USER}`,
//       password: `${process.env.PASSWORD}`,
//     });

//     console.log(' Atualizando banco com Liquibase...');
//     await liquibase.status();
//     console.log('Banco atualizado com sucesso!');

//     const PORT = 3000;
//     server = app.listen(PORT, () => {
//       console.log(`Servidor rodando em http://${process.env.HOST}:${PORT}`);
//     });
//   } catch (err) {
//     console.error('Erro ao atualizar banco com Liquibase:', err.message);
//     process.exit(1);
//   }
// }

// if (require.main === module) {
//   iniciarServidor();
// }

// module.exports = { app, server };

//--------------------------------------------------------------------------------------------------------------

// versao com migracao com js puro

// const express = require('express');
// const cors = require('cors');
// const path = require('path');

// const runMigrations = require('./runMigration');
//  // importe a função de migração

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.static(__dirname));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// const tarefaRoutes = require('./tarefaRoutes.js');
// app.use('/', tarefaRoutes);

// let server = null;

// async function startServer() {
//   try {
//     console.log('🚀 Executando migrações antes de subir o servidor...');
//     await runMigrations();  // roda as migrações

//     const PORT = 3000;
//     server = app.listen(PORT, () => {
//       console.log(`Servidor rodando em http://${process.env.HOST}:${PORT}`);
//     });
//   } catch (error) {
//     console.error('Erro ao executar migrações:', error);
//     process.exit(1); // aborta se der erro na migração
//   }
// }

// if (require.main === module) {
//   startServer();
// }

// module.exports = { app, server };


// const express = require('express');
// const cors = require('cors');
// const path = require('path');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // 🔹 Servir arquivos estáticos da mesma pasta
// app.use(express.static(__dirname));

// // 🔹 Opcional: redireciona raiz "/" para index.html
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// // 🔹 Rotas da API (deixe por último)
// const tarefaRoutes = require('./tarefaRoutes.js');
// app.use('/', tarefaRoutes);

// // 🔹 Inicializa o servidor
// if (require.main === module) {
//   const PORT = 3000;
//   app.listen(PORT, () => {
//     console.log(`Servidor rodando em http://localhost:${PORT}`);
//   });
// }

// module.exports = app;


// index.js

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

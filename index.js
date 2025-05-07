const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const tarefaRoutes = require('./tarefaRoutes.js');
app.use('/', tarefaRoutes);

// Só roda o servidor se não estiver em modo de teste (quando o arquivo for importado)
if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;

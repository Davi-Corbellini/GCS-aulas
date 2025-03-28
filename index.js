const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');

app.use(cors());

app.get('/tarefas', (req, res) => {
  db.query('SELECT * FROM tarefa', (err, results) => {
    if (err) {
      console.error('Erro ao fazer a consulta:', err);
      return res.status(500).send('Erro no banco de dados');
    }
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

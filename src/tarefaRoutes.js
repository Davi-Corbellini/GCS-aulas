const express = require('express');
const router = express.Router();
const db = require('./db.js');
const enviarEmail = require('./email');

// Listar todas as tarefas
router.get('/tarefas', (req, res) => {
  const sql = 'SELECT * FROM tarefa';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar tarefas:', err);
      return res.status(500).json({ erro: 'Erro no servidor' });
    }
    res.json(results);
  });
});


// Buscar uma tarefa específica pelo ID
router.get('/tarefas/:id', (req, res) => {
  const id = Number(req.params.id);

  console.log("id back: " + id)

  const sql = 'SELECT * FROM tarefa WHERE id = ?';

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar tarefa por ID:', err);
      return res.status(500).json({ erro: 'Erro ao buscar tarefa' });
    }

    if (results.length === 0) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }

    res.status(200).json(results[0]);
  });
});



// Excluir uma tarefa
router.delete('/tarefas/:id', (req, res) => {
  const id = req.params.id;
  console.log('Excluindo tarefa com ID:', id);

  const sql = 'DELETE FROM tarefa WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir tarefa:', err);
      return res.status(500).json({ erro: 'Erro ao excluir tarefa' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }

    return res.json({ mensagem: 'Tarefa excluída com sucesso' });
  });
});

//cadastro
router.post('/tarefas', (req, res) => {
  const { descricao, data_prevista, situacao } = req.body;

  const data_criacao = new Date();
  const data_encerramento = new Date('2025-07-25');

  const sql = 'INSERT INTO tarefa (descricao, data_criacao, data_prevista, data_encerramento, situacao) VALUES (?, ?, ?, ?, ?)';
  const valores = [descricao, data_criacao, data_prevista, data_encerramento, situacao];

  db.query(sql, valores, (err, result) => {
    if (err) {
      console.error('Erro ao inserir tarefa:', err);
      return res.status(500).json({ erro: 'Erro ao cadastrar tarefa' });
    }

    res.status(201).json({ mensagem: 'Tarefa cadastrada com sucesso!' });
    enviarEmail(descricao, 'cadastrada');
  });
});


// Atualizar tarefa
router.put('/tarefas/:id', (req, res) => {
  const { descricao, data_prevista, situacao } = req.body;
  const id = req.params.id;

  // Atualiza a tarefa no banco
  const sql = `
    UPDATE tarefa
    SET descricao = ?, data_prevista = ?, situacao = ?
    WHERE id = ?
  `;

  db.query(sql, [descricao, data_prevista, situacao, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar tarefa:', err);
      return res.status(500).json({ erro: 'Erro ao atualizar tarefa' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }

    res.status(200).json({ mensagem: 'Tarefa atualizada com sucesso' });
    enviarEmail(descricao, 'atualizada');
  });
});




//login
router.post('/login', (req, res) => {
  const { nome, senha } = req.body;

  const sql = 'SELECT * FROM usuario WHERE nome = ? AND senha = ?';
  db.query(sql, [nome, senha], (err, results) => {
    if (err) {
      console.error('Erro ao verificar login:', err);
      return res.status(500).json({ erro: 'Erro no servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ erro: 'Usuário ou senha inválidos' });
    }

    // Login bem-sucedido
    return res.status(200).json({ mensagem: 'Login bem-sucedido' });
  });
});


module.exports = router;

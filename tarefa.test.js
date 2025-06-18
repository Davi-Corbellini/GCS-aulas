// tarefa.test.js
const request = require('supertest');
const app = require('./index');

describe('Testes Simples - API de Tarefas', () => {
  test('1. Listar tarefas (GET /tarefas)', async () => {
    const res = await request(app).get('/tarefas');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('2. Cadastrar tarefa válida (POST /tarefas)', async () => {
    const novaTarefa = {
      descricao: "Tarefa de teste válida",
      data_prevista: "2025-07-24 21:00:00",
      situacao: "pendente"
    };

    const res = await request(app).post('/tarefas').send(novaTarefa);
    expect([200, 201]).toContain(res.statusCode);
    expect(res.body).toHaveProperty('mensagem', 'Tarefa cadastrada com sucesso!');
  });

  test('3. Cadastrar tarefa inválida (POST /tarefas)', async () => {
    const res = await request(app).post('/tarefas').send({});
    expect(res.statusCode).toBe(500); 
  });

  test('4. Editar tarefa (PUT /tarefas/:id)', async () => {
    const res = await request(app).put('/tarefas/1').send({
      descricao: "Tarefa editada",
      data_prevista: "2025-08-01 12:00:00",
      situacao: "concluida"
    });
    expect([200, 404]).toContain(res.statusCode);
  });

  test('5. Remover tarefa (DELETE /tarefas/:id)', async () => {
    const res = await request(app).delete('/tarefas/1');
    expect([200, 404]).toContain(res.statusCode);
  });

  test('6. Buscar tarefa por ID (GET /tarefas/:id)', async () => {
    const res = await request(app).get('/tarefas/1');
    expect([200, 404]).toContain(res.statusCode);
  });

  test('7. Verificar se API responde JSON', async () => {
    const res = await request(app).get('/tarefas');
    expect(res.headers['content-type']).toMatch(/json/);
  });

  test('8. Login com credenciais erradas (POST /login)', async () => {
    const res = await request(app).post('/login').send({
      usuario: "teste",
      senha: "invalida"
    });
    expect([401, 403]).toContain(res.statusCode);
  });

  test('9. Cadastro com campo vazio (POST /tarefas)', async () => {
    const res = await request(app).post('/tarefas').send({
      descricao: "", data_prevista: "", situacao: ""
    });
    expect(res.statusCode).toBe(500); // ajuste conforme o código real retornado
  });

  test('10. Editar tarefa inexistente (PUT /tarefas/:id)', async () => {
    const res = await request(app).put('/tarefas/9999').send({
      descricao: "Tarefa editada",
      data_prevista: "2025-08-01 12:00:00",
      situacao: "concluida"
    });
    expect(res.statusCode).toBe(404);
  });



test('11. Filtrar tarefas por situação (GET /tarefas?filtro=concluida)', async () => {
    const res = await request(app).get('/tarefas?filtro=concluida');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('12. Realizar login com credenciais corretas (POST /login)', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        nome: 'davi',
        senha: '123',
      });
  
    expect(res.statusCode).toBe(200);
    expect(res.body.mensagem).toBe('Login bem-sucedido');
  });
  

  test('13. Editar tarefa com dados inválidos (PUT /tarefas/1)', async () => {
    const res = await request(app).put('/tarefas/1').send({
      descricao: "", data_prevista: "", situacao: ""
    });
    expect([400, 404]).toContain(res.statusCode);
  });

  test('14. Remover tarefa inexistente (DELETE /tarefas/9999)', async () => {
    const res = await request(app).delete('/tarefas/9999');
    expect([404, 400]).toContain(res.statusCode);
  });

  test('15. Cadastrar tarefa com campo extra ignorado (POST /tarefas)', async () => {
    const res = await request(app).post('/tarefas').send({
      descricao: "Extra",
      data_prevista: "2025-12-31 00:00:00",
      situacao: "pendente",
      campo_invalido: "deve ser ignorado"
    });
    expect(res.statusCode).toBe(201);
  });

  test('16. Buscar tarefa com ID inválido (GET /tarefas/abc)', async () => {
    const res = await request(app).get('/tarefas/abc');
    expect(res.statusCode).toBe(500);
  });

  test('17. Filtrar com valor inexistente (GET /tarefas?filtro=naoexiste)', async () => {
    const res = await request(app).get('/tarefas?filtro=naoexiste');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('18. Filtrar tarefas por data (GET /tarefas?filtro=2025-07-25)', async () => {
    const res = await request(app).get('/tarefas?filtro=2025-07-25');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  
  });

  test('19. Verificar se rota / responde (GET /)', async () => {
    const res = await request(app).get('/');
    expect([200, 404]).toContain(res.statusCode);
  });

  test('20. Verificar tempo de resposta da API (GET /tarefas)', async () => {
    const inicio = Date.now();
    const res = await request(app).get('/tarefas');
    const duracao = Date.now() - inicio;
    expect(duracao).toBeLessThan(1000);
  });


});


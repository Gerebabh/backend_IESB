// 3.b: Importa o pacote supertest
const supertest = require('supertest');

// 3.c: Importa a instância da aplicação Express (o que vamos testar)
const app = require('../app'); 

// 3.d: Cria a instância de requisição. O Supertest "envelopa" o app para testes.
const request = supertest(app);
const ENDPOINT = '/tarefas'; // Constante para o caminho base da API (melhora a legibilidade)

// 3.e: Agrupamos os testes no bloco principal
describe('Testes de Integração para a API de Tarefas (CRUD)', () => {
    // Variável para armazenar o ID da tarefa criada. Acesso restrito a este bloco (escopo local).
    let id; 
    
    // 3.e: Teste para verificar se a chamada GET /tarefas retorna status 200 e JSON
    test('GET /tarefas deve retornar status 200 e JSON (Listar tarefas)', async () => {
        // Realiza a requisição GET para o endpoint definido
        const response = await request.get(ENDPOINT); 

        // Verificações (Matchers):
        expect(response.statusCode).toBe(200); // Espera o código de status HTTP 200 (OK)
        // Verifica se o cabeçalho 'Content-Type' contém 'json'
        expect(response.headers['content-type']).toMatch(/json/); 
        // Verifica se o corpo da resposta é um Array (lista de tarefas)
        expect(response.body).toBeInstanceOf(Array); 
    });

    // 3.f: Teste para verificar se a chamada POST /tarefas retorna status 201 e o objeto criado
    test('POST /tarefas deve retornar status 201 e o objeto criado', async () => {
        const novaTarefa = { 
            nome: 'Estudar Node', 
            concluida: false 
        };

        // Faz a requisição POST e envia o corpo JSON usando .send(obj)
        const response = await request.post(ENDPOINT).send(novaTarefa);

        // 1. Verifica o status 201 (Created)
        expect(response.statusCode).toBe(201); 
        // 2. Verifica o tipo de conteúdo JSON
        expect(response.headers['content-type']).toMatch(/json/); 
        // 3. Verifica se o objeto retornado contém a chave 'id'
        expect(response.body).toHaveProperty('id');
        // 4. Verifica se o nome da tarefa retornada corresponde ao nome enviado
        expect(response.body.nome).toBe(novaTarefa.nome);
        // 5. Salva o ID retornado na variável local 'id' para os próximos testes
        id = response.body.id; 
    });

    // 3.g: Teste para verificar se a chamada GET /tarefas/:id retorna status 200 e o objeto correto
    test('GET /tarefas/:id deve retornar status 200 e o objeto correto', async () => {
        // Constrói a URL usando o ID que foi salvo no teste POST (3.f)
        const response = await request.get(`${ENDPOINT}/${id}`);

        // 1. Verifica se o status é 200 (Sucesso)
        expect(response.statusCode).toBe(200); 
        // 2. Verifica o Content-Type
        expect(response.headers['content-type']).toMatch(/json/); 
        // 3. Verifica se o ID retornado é o ID que pedimos
        expect(response.body.id).toBe(id); 
        // 4. Verifica se o objeto retornado é um Objeto
        expect(response.body).toBeInstanceOf(Object);
    });

    // 3.h: Teste para verificar se a chamada GET /tarefas/:id com ID inexistente retorna 404
    test('GET /tarefas/1 (ID inexistente) deve retornar status 404', async () => {
        // Tenta buscar um ID que sabemos que não existe (usando '1' como exemplo)
        const response = await request.get(`${ENDPOINT}/1`);

        // 1. Verifica se o status é 404 (Not Found)
        expect(response.statusCode).toBe(404); 
        // 2. Verifica se a resposta é JSON (mesmo em caso de erro)
        expect(response.headers['content-type']).toMatch(/json/);
    });
    
    // 3.i: Teste para verificar se a chamada PUT /tarefas/:id retorna status 200 e o objeto atualizado
    test('PUT /tarefas/:id deve retornar status 200 e o objeto atualizado', async () => {
        const tarefaAtualizada = { 
            nome: 'Estudar Node e Express', 
            concluida: true 
        };

        // Faz a requisição PUT e envia o corpo JSON usando o ID salvo
        const response = await request.put(`${ENDPOINT}/${id}`).send(tarefaAtualizada);

        // 1. Verifica o status 200 (OK)
        expect(response.statusCode).toBe(200); 
        // 2. Verifica o tipo de conteúdo JSON
        expect(response.headers['content-type']).toMatch(/json/); 
        // 3. Verifica se a propriedade 'nome' foi atualizada
        expect(response.body.nome).toBe(tarefaAtualizada.nome);
        // 4. Verifica se a propriedade 'concluida' foi atualizada
        expect(response.body.concluida).toBe(true); 
    });
    
    // 3.j: Teste para verificar se a chamada PUT /tarefas/:id com ID inexistente retorna 404
    test('PUT /tarefas/1 (ID inexistente) deve retornar status 404', async () => {
        const tarefaFalsa = { 
            nome: 'Atualização Falha', 
            concluida: false 
        };
        // Tenta atualizar um ID que sabemos que não existe
        const response = await request.put(`${ENDPOINT}/1`).send(tarefaFalsa);

        // 1. Verifica o status 404 (Not Found)
        expect(response.statusCode).toBe(404); 
        // 2. Verifica se a resposta é JSON
        expect(response.headers['content-type']).toMatch(/json/);
    });

    // 3.k: Teste para verificar se a chamada DELETE /tarefas/:id retorna status 204 (Sem conteúdo)
    test('DELETE /tarefas/:id deve retornar status 204', async () => {
        // Faz a requisição DELETE usando o ID salvo
        const response = await request.delete(`${ENDPOINT}/${id}`);

        // 1. Verifica o status 204 (No Content - Sucesso, mas sem corpo de resposta)
        expect(response.statusCode).toBe(204); 
        // 2. Verifica se o corpo da resposta está vazio
        expect(response.body).toEqual({}); 
    });

    // 3.l: Teste para verificar se a chamada DELETE /tarefas/:id com ID inexistente retorna 404
    test('DELETE /tarefas/1 (ID inexistente) deve retornar status 404', async () => {
        // Tenta deletar o ID que já foi removido ou um ID fixo inexistente (ex: 1)
        const response = await request.delete(`${ENDPOINT}/1`);

        // 1. Verifica o status 404 (Not Found)
        expect(response.statusCode).toBe(404); 
        // 2. Verifica se a resposta é JSON
        expect(response.headers['content-type']).toMatch(/json/);
    });
});

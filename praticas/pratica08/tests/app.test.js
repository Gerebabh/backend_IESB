const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
const urlProdutos = "/produtos"

describe("Teste do recurso / Produtos", () => {
    test('GET /produtos deve retornar 401', async() => { 
        const response = await request.get(urlProdutos); 
        expect(response.status).toBe(401); 
        expect(response.body.msg).toBe("Nao autorizado");
    });

test('GET /produtos com token inválido deve retornar 401 e mensagem de erro', async () => {
    const response = await request
        .get('/produtos')
        .set('Authorization', 'token 123456789');

    expect(response.status).toBe(401);
    expect(response.body.msg).toBe('msg: Token inválido');
});

});


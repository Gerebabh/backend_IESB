const supertest = require('supertest'); 
const app = require('../app'); 
const request = supertest(app); 

let id = null ; 

const url = '/produtos' ; 

describe('Testes do recurso /produtos', () => { 
    test('POST /produtos deve retornar 201', async() => { 
        const response = await request.post(url).send({
            nome: "Laranja", 
            preco: 10.0
        }); 
        expect(response.status).toBe(201); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body._id).toBeDefined(); 
        expect(response.body.nome).toBe("Laranja"); 
        expect(response.body.preco).toBe(10.0);
        id = response.body._id; 
    }); 

    test('POST /produtos deve retornar 422 (Criar um objeto sem passar nada no body)', async() => { 
        const response = await request.post(url); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.status).toBe(422); 
        expect(response.body.msg).toBe("Nome e preço do produto são obrigatórios!");
    }); 

    test('GET /produtos deve retornar 200', async() => { 
        const response = await request.get(url); 
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.status).toBe(200); 
        expect(Array.isArray(response.body)).toBe(true); 
    }); 

    test('GET /produtos/:id deve retornar 200', async() => { 
        const response = await request.get(`${url}/${id}`);
        expect(response.status).toBe(200); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body._id).toBeDefined(); 
        expect(response.body.nome).toBe("Laranja"); 
        expect(response.body.preco).toBe(10.0); 
    }); 

    test('GET /produtos/0 deve retornar 400 (Buscar um objeto com um ID inexistente e inválido)', async() => { 
        const response = await request.get(`${url}/0`); 
        expect(response.status).toBe(400); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Parâmetro inválido!"); 
    }); 

    test('GET /produtos/000000000000000000000000 deve retornar 404 (Buscar um objeto com um ID válido só que não tem no banco)', async() => { 
        const response = await request.get(`${url}/000000000000000000000000`); 
        expect(response.status).toBe(404); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Produto não encontrado!"); 
    }); 

    test('PUT /produtos/:id deve retornar 200', async() => { 
        const response = await request.put(`${url}/${id}`)
        .send({
            nome: "Laranja Pera", 
            preco: 18.0,
        }); 
        expect(response.status).toBe(200); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body._id).toBeDefined();
        expect(response.body.nome).toBe("Laranja Pera"); 
        expect(response.body.preco).toBe(18.0); 
    });

    test('PUT /produtos/:id deve retornar 422(Requisição sem enviar nada(SEM CORPO))', async() => {
        const response = await request.put(`${url}/${id}`)
        .send({nome:"", preco:""});
        expect(response.status).toBe(422); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Nome e preço do produto são obrigatórios!"); 
    }); 

    test('PUT /produtos/o deve retornar 400(ID inválido)', async() => {
        const response = await request.put(`${url}/0`); 
        expect(response.status).toBe(400); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Parâmetro inválido!"); 
    }); 

    test('PUT /produtos/000000000000000000000000 deve retornar 404 (Objeto com ID válido mas não existente no banco)', async() => { 
        const response = await request.put(`${url}/000000000000000000000000`); 
        expect(response.status).toBe(404); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Produto não encontrado!"); 
    }); 

    test('DELETE /produtos/:id deve retornar 204 sem corpo', async() => { 
        const response = await request.delete(`${url}/${id}`); 
        expect(response.status).toBe(204); 
    }); 

    test('DELETE /produtos/0 deve retonar 400(ID inválido)', async() => { 
        const response = await request.delete(`${url}/0`);
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Parâmetro inválido!"); 
    }); 

    test('DELETE /produtos/000000000000000000000000 deve retornar 404', async() => { 
        const response = await request.delete(`${url}/000000000000000000000000`); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Produto não encontrado!"); 
    })
})
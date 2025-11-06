const supertest = require('supertest'); 
const app = require('../app'); 
const request = supertest(app); 

let token = null ; 
let novoToken = null ; 

const urlProdutos = '/produtos' ; 
const urlLoginUsuarios = '/usuarios/login'; 
const urlRenovarUsuarios = '/usuarios/renovar'; 


describe('TESTES NA ROTA /PRODUTOS', () => { 
    test('GET /produtos deve retornar 401', async() => { 
        const response = await request.get(urlProdutos); 
        expect(response.status).toBe(401); 
        expect(response.body.msg).toBe("Não autorizado")
    }); 

    test('GET /produtos passando cabeçalho deve retornar 401', async() => { 
        const response = await request.get(urlProdutos)
        .set('Authorization', 'Bearer 123456789'); 
        expect(response.status).toBe(401); 
        expect(response.body.msg).toBe("Token inválido"); 
    }); 

    test('POST /usuarios/login deve retornar 200' , async() => { 
        const response = await request.post(urlLoginUsuarios).send({
            email: "email@exemplo.com.br", 
            senha: "abcd1234"
        }); 
        expect(response.status).toBe(200); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.token).toBeDefined(); 
        token = response.body.token; 
    }); 

    test('GET /produtos passando o token deve retornar 200', async() => { 
        const response = await request.get(urlProdutos)
        .set('Authorization', `Bearer ${token}`); 
        expect(response.status).toBe(200); 
        expect(response.headers['content-type']).toMatch(/json/); 
    }); 

    test('POST /usuarios/renovar deve retornar 200', async() => {
        const response = await request.post(urlRenovarUsuarios)
        .set('Authorization', `Bearer ${token}`); 
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.token).toBeDefined(); 
        novoToken = response.body.token ; 
    }); 

    test('GET /produtos com o novo token deve retornar 200', async() => { 
        const response = await request.get(urlProdutos)
        .set('Authorization', `Bearer ${novoToken}`); 

        expect(response.status).toBe(200); 
        expect(response.headers['content-type']).toMatch(/json/); 
    })
})
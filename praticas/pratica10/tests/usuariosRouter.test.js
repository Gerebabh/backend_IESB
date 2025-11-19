const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);

const url = "/usuarios";
let id = null;
let token = null;

describe("TESTES DO RECURSO /usuarios", () => {

    test("POST /usuarios deve retornar 201", async () => {
        const response = await request
            .post(url)
            .send({ email: "usuario@email.com", senha: "abcd1234" });

        expect(response.status).toBe(201);
        expect(response.body._id).toBeDefined();
        expect(response.body.email).toBe("usuario@email.com");

        id = response.body._id;
    });

    test("POST /usuarios sem JSON → 422", async () => {
        const response = await request.post(url).send({});
        expect(response.status).toBe(422);
        expect(response.body.msg).toBe("Email e Senha são obrigatórios");
    });

    test("POST /usuarios/login deve retornar token", async () => {
        const response = await request
            .post(url + "/login")
            .send({
                usuario: "usuario@email.com",
                senha: "abcd1234"
            });

        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();

        token = response.body.token;
    });

    test("POST /usuarios/login sem JSON → 401", async () => {
        const response = await request.post(url + "/login").send({});
        expect(response.status).toBe(401);
        expect(response.body.msg).toBe("Credenciais inválidas");
    });

    test("POST /usuarios/renovar com token válido → 200", async () => {
        const response = await request
            .post(url + "/renovar")
            .set("authorization", "Bearer " + token);

        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    });

    test("POST /usuarios/renovar com token inválido → 401", async () => {
        const response = await request
            .post(url + "/renovar")
            .set("authorization", "Bearer 123456");

        expect(response.status).toBe(401);
        expect(response.body.msg).toBe("Token invalido");
    });

    test("DELETE /usuarios/:id → 204", async () => {
        const response = await request
            .delete(url + "/" + id)
            .set("authorization", "Bearer " + token);

        expect(response.status).toBe(204);
    });

});

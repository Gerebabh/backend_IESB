# Trabalho APIRestFul

## Passo a passo do trabalho

### a) Desenvolva uma API RESTful utilizando o framework Express para gerenciar uma entidade à sua escolha (ex: Usuários, Produtos, Tarefas, etc).

---

#### 1. Criação da pasta do trabalho

Criação da pasta do trabalho dentro da mesma pasta pai das aulas e práticas `backend_IESB`. Pasta APIRestFul. No terminal:

```bash
mkdir APIRestFul
```

---

#### 2. Inicializar o Projeto Node para criação do package.json

```bash
npm init -y
```

---

#### 3. Instalação dos pacotes principais

- Instale o **Express** (gerencia rotas HTTP, requisições e respostas da aplicação).
- Instale o **Nodemon** (monitora arquivos do projeto e reinicia o servidor em tempo real durante desenvolvimento; semelhante ao Live Server em projetos web estáticos).
```bash
npm install express
npm install --save-dev nodemon
```

---

#### 4. Estrutura de pastas e arquivos principais

Dentro da pasta `APIRestFul` deve ser criada a pasta `src` com os arquivos `app.js` e `server.js`.

- Crie a pasta `src`:

    ```bash
    mkdir src
    ```

- Dentro de `src`, crie manualmente os arquivos `app.js` e `server.js` ou com os comandos abaixo conforme o SO. Você deve estar dentro da pasta `src`, caso não ajuste o comando conforme necessário.
  - **Linux/macOS:**  
    ```bash
    touch src/app.js src/server.js
    ```
  - **Windows (PowerShell):**  
    ```bash
    New-Item -Path ..\src -Name "app.js" -ItemType "file"
    New-Item -Path ..\src -Name "server.js" -ItemType "file"
    ```

---

#### 5. Inserir o código abaixo dentro de cada arquivo:

##### `src/app.js`
```js
const express = require('express'); // Importa o framework Express para gerenciamento de rotas HTTP
const app = express();

// Middleware para aceitar requisições com corpo JSON
app.use(express.json());

// Rota inicial para teste da API
app.get('/', (req, res) => {
    res.json({ message: 'API RESTful funcionando 🚀' });
});

module.exports = app;
```


##### `src/server.js`
```js
const app = require('./app');

// Por questão de padronização e boas práticas a porta padrão está sendo declarada
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
```

---

#### 6. Abrir o arquivo `package.json` e editar o "scripts" adicionando `start` e `dev` para chamar a inicialização dos scripts.

Adicione os scripts `start` e `dev`:
```json
"scripts": {
  "start": "node src/server.js",
  "dev": "nodemon src/server.js"
}
``` 
---

#### 7. Rodando o servidor

Execute o comando abaixo para rodar o servidor em modo de desenvolvimento (com reinício automático):
```bash
npm run dev
```

- Ao subir o servidor, será exibida a mensagem:
```
Servidor rodando na porta 3000
```

- Para testar, acesse no navegador ou no Postman:
```
http://localhost:3000
``` 


- Se estiver tudo certo, será exibida esta resposta JSON:

```json
{
    "message": "API RESTful funcionando 🚀"
}
```
---

### b) Implemente rotas CRUD (Create, Read, Update, Delete) para essa entidade, devendo cada rota seguir a convenção de métodos HTTP (POST, GET, PUT/PATCH, DELETE) e retornar respostas HTTP adequadas, incluindo erro quando necessário.
---
1. Pare o servidor `ctrl+c`. Criar a estrutura de pastas necessárias para configuração de controladores e rotas para separar a lógica de negócio e os endpoints da API.

---
2. Dentro da pasta `src`, criar duas novas pastas:
```bash
mkdir controllers
mkdir routers
```
Sendo que em `controllers` será incluído a lógica CRUD de Users (em memória por enquanto) e em `routes` os endpoints da API.

---
3. Em seguida criar os arquivos nas respectivas pastas. Isso pode ser feito via VSCode ou linha de comando. Você deve estar dentro da pasta `src`, caso não ajuste o comando conforme necessário.

---
4. 
- **Linux/macOS:**  
```bash
touch controllers/userController.js
touch routes/userRoutes.js
```
- **Windows (PowerShell):**  
```bash
New-Item -Path .\controllers -Name "userController.js" -ItemType "file"
New-Item -Path .\routes -Name "userRoutes.js" -ItemType "file"
```

---
5. Criar o controller `userController.js`
Dentro de `src/controllers/userController.js`, adicione:

```js
// Cria o array users para "Banco" em memória
let users = [];
let idCounter = 1;

// Criar usuário
exports.createUser = (req, res) => {
    const { name, email } = req.body;
    // Testa se nome ou email estão vazios. Não podem estar.
    if (!name || !email) { 
        // Caso estejam retornará "400 badrequest" erro na sintaxe ou inválida
        return res.status(400).json({ error: 'Nome e email são obrigatórios.' }); 
    }

    // Se passar no teste, realiza a criação
    const newUser = { id: idCounter++, name, email }; 
    users.push(newUser);
    res.status(201).json(newUser); // Status "201 Created", ou seja, requisição bem-sucedida 
};

// Listar todos os usuários
exports.getAllUsers = (req, res) => {
    res.json(users);
};

// Buscar usuário por ID
exports.getUserById = (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  // Caso busque por um ID inexistente o retorno será "404 Not Found"
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
  res.json(user);
};

// Atualizar usuário
exports.updateUser = (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    // Testa se o usuário realmente existe, senão erro
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });

    // Caso exista procede com a alteração
    const { name, email } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;

    res.json(user);
};

// Deletar usuário
exports.deleteUser = (req, res) => {
    // Testa se o usuário realmente existe, senão erro
    const index = users.findIndex(u => u.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Usuário não encontrado.' });
    // Caso exista ele é deletado
    const deleted = users.splice(index, 1);
    res.json(deleted[0]);
};

```
---

### Tabela para consulta com o principais códigos de status HTTP

| Código | Categoria         | Mensagem                 | Descrição Principal                                                                   |
|--------|-------------------|--------------------------|--------------------------------------------------------------------------------------|
| 100    | 1xx Informativo   | Continue                 | O servidor recebeu os cabeçalhos da requisição, continue o envio do corpo.           |
| 101    | 1xx Informativo   | Switching Protocols      | O servidor aceita alterar o protocolo conforme solicitado pelo cliente.              |
| 102    | 1xx Informativo   | Processing               | O servidor recebeu e está processando o pedido, sem resposta disponível ainda.       |
| 103    | 1xx Informativo   | Early Hints              | O servidor envia sugestões para pré-carregamento de recursos.                        |
| 200    | 2xx Sucesso       | OK                       | Requisição bem-sucedida, resposta depende do método (GET, POST, etc.).              |
| 201    | 2xx Sucesso       | Created                  | A requisição resultou na criação de um novo recurso.                                 |
| 202    | 2xx Sucesso       | Accepted                 | A requisição foi aceita para processamento, mas não concluída.                       |
| 203    | 2xx Sucesso       | Non-Authoritative Info   | A resposta contém informações de fontes não-autoritativas.                           |
| 204    | 2xx Sucesso       | No Content               | Requisição bem-sucedida, mas sem conteúdo para retornar.                             |
| 205    | 2xx Sucesso       | Reset Content            | Requisição bem-sucedida, cliente deve redefinir a exibição do documento.             |
| 206    | 2xx Sucesso       | Partial Content          | Parte do recurso foi enviada devido ao cabeçalho de intervalo.                       |
| 300    | 3xx Redirecionamento | Multiple Choices      | Há múltiplas opções para o recurso solicitado.                                       |
| 301    | 3xx Redirecionamento | Moved Permanently     | O recurso foi movido permanentemente para outra URL.                                 |
| 302    | 3xx Redirecionamento | Found                 | Redirecionamento temporário do recurso.                                              |
| 303    | 3xx Redirecionamento | See Other             | O recurso pode ser encontrado em outro URI usando GET.                               |
| 304    | 3xx Redirecionamento | Not Modified          | O recurso não foi modificado desde o último acesso.                                  |
| 305    | 3xx Redirecionamento | Use Proxy             | O recurso deve ser acessado por um proxy.                                            |
| 306    | 3xx Redirecionamento | Switch Proxy          | Código obsoleto para mudança de proxy.                                               |
| 307    | 3xx Redirecionamento | Temporary Redirect    | Redirecionamento temporário, mantendo o método original.                             |
| 308    | 3xx Redirecionamento | Permanent Redirect    | Redirecionamento permanente, mantendo o método original.                             |
| 400    | 4xx Erro Cliente     | Bad Request           | Erro de sintaxe na requisição; não pode ser processada.                              |
| 401    | 4xx Erro Cliente     | Unauthorized          | Autenticação válida é necessária para o recurso.                                     |
| 402    | 4xx Erro Cliente     | Payment Required      | Reservado para uso futuro (relacionado a pagamento).                                 |
| 403    | 4xx Erro Cliente     | Forbidden             | O servidor recusou o pedido válido.                                                  |
| 404    | 4xx Erro Cliente     | Not Found             | Recurso solicitado não foi encontrado.                                               |
| 405    | 4xx Erro Cliente     | Method Not Allowed    | Método HTTP não permitido para o recurso.                                            |
| 406    | 4xx Erro Cliente     | Not Acceptable        | Recurso não disponível no formato solicitado.                                        |
| 407    | 4xx Erro Cliente     | Proxy Authentication Required | Autenticação no proxy é necessária.                                      |
| 408    | 4xx Erro Cliente     | Request Timeout       | O servidor não recebeu a requisição completa a tempo.                                |
| 409    | 4xx Erro Cliente     | Conflict              | Conflito no estado do recurso requisitado.                                           |
| 410    | 4xx Erro Cliente     | Gone                  | O recurso foi removido permanentemente.                                              |
| 411    | 4xx Erro Cliente     | Length Required       | Requer o cabeçalho Content-Length.                                                   |
| 412    | 4xx Erro Cliente     | Precondition Failed   | Condição definida pelo cliente não satisfeita.                                       |
| 413    | 4xx Erro Cliente     | Payload Too Large     | O corpo da requisição é maior que permitido.                                         |
| 414    | 4xx Erro Cliente     | URI Too Long          | O URI enviado na requisição é muito longo.                                           |
| 415    | 4xx Erro Cliente     | Unsupported Media Type| Tipo de mídia da requisição não suportado.                                           |
| 416    | 4xx Erro Cliente     | Range Not Satisfiable | A parte do recurso não pode ser fornecida.                                           |
| 417    | 4xx Erro Cliente     | Expectation Failed    | Expectativa do campo 'Expect' não pode ser satisfeita.                               |
| 422    | 4xx Erro Cliente     | Unprocessable Content | Requisição está correta, mas não pode ser processada (WebDAV).                       |
| 425    | 4xx Erro Cliente     | Too Early             | O servidor não processará porque é muito cedo.                                       |
| 426    | 4xx Erro Cliente     | Upgrade Required      | O cliente precisa trocar para outro protocolo.                                       |
| 428    | 4xx Erro Cliente     | Precondition Required | O servidor exige que o pedido seja condicional.                                      |
| 429    | 4xx Erro Cliente     | Too Many Requests     | Usuário enviou muitas requisições em curto espaço de tempo.                          |
| 431    | 4xx Erro Cliente     | Request Header Fields Too Large | Cabeçalho muito grande.                                             |
| 451    | 4xx Erro Cliente     | Unavailable For Legal Reasons | Indisponível por razões legais.                                           |
| 500    | 5xx Erro Servidor    | Internal Server Error | O servidor encontrou um erro ao processar a requisição.                              |
| 501    | 5xx Erro Servidor    | Not Implemented       | O servidor não reconhece ou não tem capacidade para executar o método.               |
| 502    | 5xx Erro Servidor    | Bad Gateway           | O servidor recebeu resposta inválida de servidor intermediário.                      |
| 503    | 5xx Erro Servidor    | Service Unavailable   | O servidor está temporariamente indisponível.                                        |
| 504    | 5xx Erro Servidor    | Gateway Timeout       | O servidor não recebeu resposta oportuna do servidor externo.                        |
| 505    | 5xx Erro Servidor    | HTTP Version Not Supported | Versão HTTP não suportada pelo servidor.                                         |
---

---
6. Configurar o aquivo de rotas `userRoutes.js`
Dentro de `src/routes/userRoutes.js`, adicione:
```js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// CRUD de Users
router.post('/users', userController.createUser);       // Create
router.get('/users', userController.getAllUsers);       // Read all
router.get('/users/:id', userController.getUserById);   // Read by ID
router.put('/users/:id', userController.updateUser);    // Update
router.delete('/users/:id', userController.deleteUser); // Delete

module.exports = router;
```

- Explicação:
  - `router.post('/users', ...)` → cria um usuário
  - `router.get('/users', ...)` → lista todos os usuários
  - `router.get('/users/:id', ...)` → busca usuário por ID
  - `router.put('/users/:id', ...)` → atualiza usuário
  - `router.delete('/users/:id', ...)` → deleta usuário
  - 
---
7. Editar o arquivo `app.js`
Dentro de `src\app.js`, adicionando:
Obs.: Este trecho deve ser adicinado antes de `module.exports`, motivo é que tudo que for utilizado precisa ser registrado antes de exportar.

```js
// Rotas de Users
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes); // todas as rotas de Users agora começam com /api

```
- **Agora, por exemplo:**
  - POST http://localhost:3000/api/users → cria usuário
  - GET http://localhost:3000/api/users → lista todos
  - PUT http://localhost:3000/api/users/:id → atualiza usuário
  - DELETE http://localhost:3000/api/users/:id → deleta usuário

---
8. Teste de cada Endpoint utilizando o Postman  
    8.1 Rodar o servidor `npm run dev`  
    8.2 Testar o `post`: `http://localhost:3000/api/users`, sem parâmetros:   
    Retornou: `500 Internal Server Error`   
    Com parâmetros:
    Retornou: `201 Created`   
    ```json
    {
        "name": "Geraldo Santos",
        "email": "geralucio@gmail.com"
    }
    ```

    Ao passar executar o `post` com um dos parâmetros (nome ou email) vazios   
    Retornou: `400 Bad Request`

    ```json
    {
        "error": "Nome e email são obrigatórios."
    }
    ```
    8.3 Testar listagem de usuários
    Conferindo se o dado foi salvo `get` :`http://localhost:3000/api/users`   
    Retornou: `200 OK`   
    ```json
    [
        {
            "id": 1,
            "name": "Geraldo Santos",
            "email": "geralucio@gmail.com"
        }
    ]
    ``` 
    8.4 Buscar usuário por ID `get` :`http://localhost:3000/api/users/1`   
    Como existe o retorno foi: `200 OK`. Porém se adicionar um ID inexistente como: `http://localhost:3000/api/users/2`   
    Retorno: `404 Not Found`
    ```json
    {
        "error": "Usuário não encontrado."
    }
    ```
    8.5 Atualizar usuário - `PUT` :`http://localhost:3000/api/users/1` alterando o nome por exemplo:   
    ```json
    {
        "name": "Geraldo Lucio Carvalho dos Santos"
    }
    ```
    Retorno: `200 OK`. Resultado da alteração:   
    ```json
    {
        "id": 1,
        "name": "Geraldo Lucio Carvalho dos Santos",
        "email": "geralucio@gmail.com"
    }
    ```
    Se o usuário não existir a informação de retorno será: `404 Not Found`   

    8.6 Deletar usuário - `DELETE` : `http://localhost:3000/api/users/1`   
    Retorno: `200 OK`. Obs.: Mesmo deletando ele mostra no retorno o que foi deletado.   
    ```json
    {
        "id": 1,
        "name": "Geraldo Lucio Carvalho dos Santos",
        "email": "geralucio@gmail.com"
    }
    ```   
    Rodar novamente para o mesmo usuário `DELETE` : `http://localhost:3000/api/users/1`   
    Retorno: `404 Not Found`. Motivo: O usuário já foi apagado.
    ```json
    {
        "error": "Usuário não encontrado."
    }
    ```
    


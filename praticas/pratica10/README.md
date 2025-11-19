### Configuracao de ambiente APIRest
1.
```bash
npx express-generator --no-view pratica10
```
2.
```bash
npm install express dotenv mongoose cookie-parser morgan bcrypt jsonwebtoken swagger-ui-express yaml cors
```
3.
```bash
npm install -D nodemon jest supertest
```
4.
```json
  "scripts": {
    "start": "node ./bin/www",
    "dev": "nodemon -e yaml,js ./bin/www",
    "test": "jest --watchAll"
  }
  ```

5.
Apagar a pasta `public` e os arquivos da pasta `routes`.

6.
Criar as pastas `controllers`, `middlewares`, `models` e `tests`.

7.
Criar o arquivo `swagger.yaml` e `.env` na raiz.

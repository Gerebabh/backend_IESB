# Aula 11 - Documentacao e Swagger

### Configuracao de ambiente
```bash
npx express-generator --no-view
``` 

```bash
npm install
``` 

```bash
npm install swagger-ui-express yaml
``` 

```bash
npm install --save-dev nodemon
``` 

### Editor Swagger
[Editor Swagger](https://editor.swagger.io/ "Abrir editor Swagger")

### Fase 2
    - Apagar a pasta public
    - Apagar os arquivos da 'routes'
    - Criar o arquivo apidocs.js na pastar routes
    - Criar o arquivo swagger.yaml na raiz do projeto

Para configurar o package.json e o arquivo yaml e necessario ajustar desta forma:
```bash
  "scripts": {
    "start": "node ./bin/www",
    "dev": "nodemon -e yaml,js ./bin/www"
  },
```
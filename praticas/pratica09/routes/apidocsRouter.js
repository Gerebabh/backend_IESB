const swaggerUi = require('swagger-ui-express');
const express = require('express');
const fs = require('fs');
const YAML = require('yaml');

// Carrregar o arquivo swagger.yaml
const file = fs.readFileSync('./swagger.yaml', 'utf8');

// Valida o formato YAML
const swaggerDoc = YAML.parse(file);

// Cria middleware de rota
const router = express.Router();

// Carrega a aplicacao do swagger UI
router.use("/", swaggerUi.serve);

// Renderizar a documentacao do Swwagger
router.get("/", swaggerUi.setup(swaggerDoc));

module.exports = router
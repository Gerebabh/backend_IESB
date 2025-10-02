const express = require('express');
const router = express.Router();

// 5.a: Importa o Controlador de Tarefas
const tarefaController = require('../controllers/tarefaController'); 

// Rota GET / (Listar todas as tarefas) - Chama tarefaController.listar
router.get('/', tarefaController.listar); 

// Rota POST / (Criar nova tarefa) - Chama tarefaController.criar
router.post('/', tarefaController.criar);

// Rota GET /:tarefaId (Buscar tarefa por ID) - Chama tarefaController.buscarPeloId
router.get('/:tarefaId', tarefaController.buscarPeloId);

// Rota PUT /:tarefaId (Atualizar tarefa) - Chama tarefaController.atualizar
router.put('/:tarefaId', tarefaController.atualizar);

// Rota DELETE /:tarefaId (Remover tarefa) - Chama tarefaController.remover
router.delete('/:tarefaId', tarefaController.remover);

module.exports = router;

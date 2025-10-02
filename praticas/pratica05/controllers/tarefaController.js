// 6.a: Importa o Modelo de Tarefas
const tarefaModel = require('../models/tarefaModel');

// LISTAR: 6.b
const listar = (req, res) => {
    // Chama o Modelo e obtém a lista de tarefas (o array 'tarefas')
    const resultado = tarefaModel.listar(); 
    res.json(resultado); 
};

// BUSCAR POR ID: 6.g, 6.h
const buscarPeloId = (req, res) => {
    const { tarefaId } = req.params; 

    // 6.g: Chama o Modelo para buscar a tarefa
    const resultado = tarefaModel.buscarPeloId(tarefaId); 

    // 6.h: Trata o erro 404 se o Modelo retornar null (não encontrou)
    if (resultado) {
        res.status(200).json(resultado);
    } else {
        res.status(404).json({ msg: 'Tarefa não encontrada' });
    }
};

// CRIAR: 6.k
const criar = (req, res) => {
    // A tarefa é composta pelo corpo da requisição (req.body)
    const tarefa = req.body;

    // 6.k: Chama o Modelo para criar e obter o objeto com o ID dinâmico
    const resultado = tarefaModel.criar(tarefa);

    // Retorna 201 e o objeto recém-criado
    res.status(201).json(resultado);
};

// ATUALIZAR: 6.n, 6.o
const atualizar = (req, res) => {
    const { tarefaId } = req.params;
    // Dados atualizados estão no corpo da requisição
    const dadosAtualizados = req.body;

    // 6.n: Chama o Modelo para atualizar
    const resultado = tarefaModel.atualizar(tarefaId, dadosAtualizados); 

    // 6.o: Trata o erro 404
    if (resultado) {
        res.status(200).json(resultado);
    } else {
        res.status(404).json({ msg: 'Tarefa não encontrada' });
    }
};

// REMOVER: 6.r, 6.s
const remover = (req, res) => {
    const { tarefaId } = req.params; 

    // 6.r: Chama o Modelo para remover
    const resultado = tarefaModel.remover(tarefaId); 

    // 6.s: Trata o erro 404 ou retorna 204
    if (resultado) {
        res.status(204).send(); // 204 No Content para sucesso
    } else {
        res.status(404).json({ msg: 'Tarefa não encontrada' });
    }
};


module.exports = {
    listar,
    buscarPeloId,
    criar,
    atualizar,
    remover
};

const Tarefa = require("./modelo");

// Adicionar nova tarefa
async function adicionarTarefa(nome) {
    const tarefa = new Tarefa(nome, false);
    await tarefa.inserir();
}

// Buscar tarefa pelo nome
async function buscarTarefa(nome) {
    const tarefa = new Tarefa(nome);
    return await tarefa.buscar();
}

// Atualizar tarefa existente
async function atualizarTarefa(nome, concluida) {
    const tarefa = new Tarefa(nome);
    const encontrada = await tarefa.buscar();
    if (encontrada) {
        tarefa.concluida = concluida;
        await tarefa.alterar();
    } else {
        console.log("Tarefa não encontrada para atualização!");
    }
}

// Remover tarefa
async function removerTarefa(nome) {
    const tarefa = new Tarefa(nome);
    const encontrada = await tarefa.buscar();
    if (encontrada) {
        await tarefa.deletar();
    } else {
        console.log("Tarefa não encontrada para remoção!");
    }
}

// Listar todas tarefas
async function listarTarefas() {
    const tarefa = new Tarefa();
    await tarefa.listar();
}

module.exports = {
    adicionarTarefa,
    buscarTarefa,
    atualizarTarefa,
    removerTarefa,
    listarTarefas
};

const Tarefa = require("./modelo");

async function testar() {
    const tarefa = new Tarefa("Estudar Node.js", false);
    await tarefa.inserir();
    await tarefa.buscar();
    await tarefa.alterar();
    await tarefa.deletar();
}

testar();

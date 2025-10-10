const readline = require("readline-sync");
const controlador = require("./controlador");

function menu() {
    console.log("\n=== MENU DE TAREFAS ===");
    console.log("1 - Adicionar tarefa");
    console.log("2 - Buscar tarefa");
    console.log("3 - Atualizar tarefa");
    console.log("4 - Remover tarefa");
    console.log("5 - Listar todas tarefas")
    console.log("6 - Sair");
}

async function escolherOpcao(opcao) {
    switch (opcao) {
    case "1":
        const nomeAdd = readline.question("Digite o nome da tarefa: ");
        await controlador.adicionarTarefa(nomeAdd);
        break;

    case "2":
        const nomeBusca = readline.question("Digite o nome da tarefa: ");
        await controlador.buscarTarefa(nomeBusca);
        break;

    case "3":
        const nomeAlt = readline.question("Nome da tarefa: ");
        const concluida = readline
        .question("Está concluída? (true/false): ")
        .toLowerCase() === "true";
        await controlador.atualizarTarefa(nomeAlt, concluida);
        break;

    case "4":
        const nomeDel = readline.question("Digite o nome da tarefa: ");
        await controlador.removerTarefa(nomeDel);
        break;

    case "5":
        await controlador.listarTarefas();
        break;

    case "6":
        console.log("Saindo...");
        process.exit();

    default:
        console.log("Opção inválida!");
    }
}

async function main() {
    while (true) {
        menu();
        const opcao = readline.question("Escolha uma opção: ");
        await escolherOpcao(opcao);
    }
}

main();

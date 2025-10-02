const gerarId = () => {
    return Math.random().toString(36).substr(2, 4);
};

// 6.d: Constante para simular o banco de dados (array em memória)
const tarefas = [];

const listar = () => {
    return tarefas;
};

const buscarPeloId = (tarefaId) => {
    return tarefas.find(t => t.id === tarefaId);
};

const criar = (tarefa) => {
    const novaTarefa = {
        id: gerarId(),
        ...tarefa,
    };
    tarefas.push(novaTarefa);
    return novaTarefa;
};

const atualizar = (tarefaId, tarefaAtualizada) => {
    const index = tarefas.findIndex(t => t.id === tarefaId);

    if (index !== -1) {
        tarefas[index] = {
            ...tarefas[index], 
            ...tarefaAtualizada, 
            id: tarefaId 
        };
        return tarefas[index];
    }
    return null;
};

// 6.t, 6.u: Função para remover uma tarefa
const remover = (tarefaId) => {
    // 1. Localiza o índice da tarefa
    const index = tarefas.findIndex(t => t.id === tarefaId);

    if (index !== -1) {
        // 2. Remove o item do array usando splice e retorna o objeto removido
        // O [0] é necessário porque splice retorna um array com os itens removidos
        const [tarefaRemovida] = tarefas.splice(index, 1);
        return tarefaRemovida;
    }
    
    // Retorna null se não encontrar
    return null;
};


module.exports = {
    listar,
    buscarPeloId,
    criar,
    atualizar,
    remover
};

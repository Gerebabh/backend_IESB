const conectarDb = require("./database");

class Tarefa {
    constructor(nome, concluida) {
        this.nome = nome;
        this.concluida = concluida;
        this.id = null;
    }

    async inicializar() {
        this.db = await conectarDb();
        this.collection = this.db.collection("tarefas");
    }

    async inserir() {
        await this.inicializar();
        const resultado = await this.collection.insertOne({
        nome: this.nome,
        concluida: this.concluida,
        });
        this.id = resultado.insertedId;
        console.log("Tarefa inserida com sucesso!");
    }

    async alterar() {
        await this.inicializar();
        await this.collection.updateOne(
        { _id: this.id },
        { $set: { nome: this.nome, concluida: this.concluida } }
        );
        console.log("Tarefa atualizada!");
    }

    async deletar() {
        await this.inicializar();
        await this.collection.deleteOne({ nome: this.nome });
        console.log("Tarefa removida!");
    }

    async buscar() {
        await this.inicializar();
        const resultado = await this.collection.findOne({ nome: this.nome });
        if (resultado) {
        this.id = resultado._id;
        this.nome = resultado.nome;
        this.concluida = resultado.concluida;
        console.log("Tarefa encontrada:", resultado);
        return resultado;
        } else {
        console.log("Tarefa não encontrada!");
        return null;
        }
    }
    async listar() {
        await this.inicializar();
        const tarefas = await this.collection.find().toArray();
        if (tarefas.length > 0) {
        console.log("\n Lista de tarefas:");
        tarefas.forEach((t, i) => {
            console.log(`${i + 1}. ${t.nome} - Concluída: ${t.concluida}`);
        });
        } else {
        console.log("Nenhuma tarefa encontrada.");
        }
        return tarefas;
    }

}

module.exports = Tarefa;

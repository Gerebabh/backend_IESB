// objeto cliente do mongodb
const { MongoClient } = require("mongodb");

// String de conexao
const url = "mongodb+srv://usrTarefas:178239@cluster0.a1lfhpi.mongodb.net/";

const client = new MongoClient(url);

let db = null;

async function conecta() {
    try {
        await client.connect();
        return client.db("agenda");
    } catch (e) {
        console.log("Erro ao conectar no MongoDB!", e.message);
    }
}

module.exports = conecta
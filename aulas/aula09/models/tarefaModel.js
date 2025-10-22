const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "Nome da tarefa e obrigatorio"],
        trim: true
    },
    concluida: Boolean
})

module.exports = mongoose.model('Tarefa', schema);
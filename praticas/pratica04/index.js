const express = require('express');
const app = express();

const tarefas = [
    { id: 1, nome: "Estudar middleware", concluida: false },
    { id: 2, nome: "Praticar Express", concluida: true }
];

app.use(express.json());

app.use((req, res, next) => {
    const agora = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    console.log(`[${agora}] ${req.method} ${req.url}`);
    next();
});

const tarefasRouter = express.Router();
app.use('/tarefas', tarefasRouter);

tarefasRouter.get('/', (req, res) => res.json(tarefas));

tarefasRouter.get('/:id', (req, res, next) => {
    const tarefa = tarefas.find(t => t.id === Number(req.params.id));
    if (!tarefa) return next(new Error("Tarefa não localizada"));
    res.json(tarefa);
});

tarefasRouter.post('/', (req, res) => {
    const novaTarefa = { id: tarefas.length + 1, ...req.body };
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});

tarefasRouter.put('/:id', (req, res, next) => {
    const tarefa = tarefas.find(t => t.id === Number(req.params.id));
    if (!tarefa) return next(new Error("Tarefa não localizada"));
    Object.assign(tarefa, req.body);
    res.json(tarefa);
});

tarefasRouter.delete('/:id', (req, res, next) => {
    const index = tarefas.findIndex(t => t.id === Number(req.params.id));
    if (index === -1) return next(new Error("Tarefa não localizada"));
    tarefas.splice(index, 1);
    res.status(204).end();
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(400).json({ erro: err.message });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));

module.exports = app;

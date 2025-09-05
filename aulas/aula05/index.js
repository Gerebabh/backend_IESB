// Importa o Framework
const express = require ("express");

// Cria uma instancia da aplicacao
const app = express();

// Cria uma funcao para teste. Tem que ser antes da inicializacao do aplicativo
// Middleware de aplicacao
app.use (function(req, res, next) {
    console.log('Passei aqui!')
    next();
});

//Mesma funcao em arrow function
// app ((req, res, next) => {
//     console.log('Passei aqui!')
//     next();
// });

// Middleware de Rota
const router = express.Router();

router.get('/', (req,res) => {
    res.send('Chegou aqui!');
});

router.post('/', (req, res) => {
    res.status(201).send('Inserido com Sucesso')
});

router.get("/:id", (req, res) => {
    const { id } = req.params; // {id: 1, param2: 5, param3: 6}
    if(id == 1) return res.send("Achei");
    // res.status(404).send('Nao achei');
    throw Error ('Nao achei');
});

app.use('/tarefas', router);

// Middleware de Erro
app.use((err, req, res, next) => {
    console.log(err.stack)
    console.error(err.stack);
    res.status(500).send('Deu Ruim!! Algo de errado nao esta certo!')
})

// Inicializa a aplicacao
app.listen(3000, () =>{
    console.log('A Aplicação esta ON')
});


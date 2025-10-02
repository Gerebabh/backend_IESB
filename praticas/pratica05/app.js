var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Importação do roteador de tarefas que criaremos no próximo passo.
// Usamos o nome 'tarefas' pois o recurso é plural.
var tarefasRouter = require('./routes/tarefaRouter'); 

var app = express();

// Middlewares de Nível de Aplicação
app.use(logger('dev'));
app.use(express.json()); // Habilita o Express a processar corpo de requisições em JSON
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Conexão do Roteador com a aplicação
// Qualquer requisição para /tarefas será direcionada ao tarefasRouter
app.use('/tarefas', tarefasRouter); 

// Middlewares de tratamento de erros (404/500) devem ser adicionados aqui (próximos passos)


module.exports = app;
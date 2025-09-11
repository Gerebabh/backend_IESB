const express = require('express'); // Importa o framework Express para gerenciamento de rotas HTTP
const app = express();

// Middleware para aceitar requisições com corpo JSON
app.use(express.json());

// Rota inicial para teste da API
app.get('/', (req, res) => {
    res.json({ message: 'API RESTful funcionando 🚀' });
});

// Rotas de Users
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes); // todas as rotas de Users agora começam com /api

module.exports = app;

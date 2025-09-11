const app = require('./app');

// Por questão de padronização e boas práticas a porta padrão está sendo declarada
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// Cria o array users para "Banco" em memória
let users = [];
let idCounter = 1;

// Criar usuário
exports.createUser = (req, res) => {
    const { name, email } = req.body;
    // Testa se nome ou email estão vazios. Não podem estar.
    if (!name || !email) { 
        // Caso estejam retornará "400 badrequest" erro na sintaxe ou inválida
        return res.status(400).json({ error: 'Nome e email são obrigatórios.' }); 
    }

    // Se passar no teste, realiza a criação
    const newUser = { id: idCounter++, name, email }; 
    users.push(newUser);
    res.status(201).json(newUser); // Status "201 Created", ou seja, requisição bem-sucedida 
};

// Listar todos os usuários
exports.getAllUsers = (req, res) => {
    res.json(users);
};

// Buscar usuário por ID
exports.getUserById = (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    // Caso busque por um ID inexistente o retorno será "404 Not Found"
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
    res.json(user);
};

// Atualizar usuário
exports.updateUser = (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    // Testa se o usuário realmente existe, senão erro
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });

    // Caso exista procede com a alteração
    const { name, email } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;

    res.json(user);
};

// Deletar usuário
exports.deleteUser = (req, res) => {
    // Testa se o usuário realmente existe, senão erro
    const index = users.findIndex(u => u.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Usuário não encontrado.' });
    // Caso existe ele é deletado
    const deleted = users.splice(index, 1);
    res.json(deleted[0]);
};
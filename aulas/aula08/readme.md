🚀 Interagindo com MongoDB via Node.js
Este guia rápido mostra como configurar um projeto Node.js e interagir com um banco MongoDB (Atlas) utilizando a biblioteca oficial `mongodb`.

⚙️ Configuração do Projeto Node.js
| Passo | Comando / Ação | Observação |
|-------|----------------|------------|
| Inicializar projeto | `npm init -y` | Cria o `package.json` padrão |
| Instalar MongoDB driver | `npm install mongodb` | Biblioteca oficial para conexão com MongoDB |
| Instalar readline-sync | `npm install readline-sync` | Permite criar input via linha de comando no Node.js |

💻 Configuração do Banco de Dados Atlas
| Passo | Ação | Observação |
|-------|------|------------|
| Criar usuário | Database Access → Create User | Use permissão `read and write`, **não DBA** por segurança |
| Liberar IPs | Network Access → Add IP Address | Para aula: 0.0.0.0/0 (qualquer IP) |
| Gerar string de conexão | MongoDB Atlas → Connect → Connect Your Application | Copie a URL para usar no Node.js |

📂 Criação do Arquivo de Conexão (database.js)
| Passo | Código / Ação | Observação |
|-------|---------------|------------|
| Importar MongoClient | `const { MongoClient } = require('mongodb');` | Objeto MongoClient vem entre chaves, pois não é export default |
| Criar URL de conexão | `const url = 'sua_string_de_conexao';` | Copie do Mongo Atlas |
| Criar objeto client | `const client = new MongoClient(url);` | Será usado para conectar ao DB |
| Criar função async de conexão | ```javascript async function connectDB() { try { await client.connect(); console.log('Conectado ao MongoDB!'); } catch (err) { console.error('Erro ao conectar:', err); } } module.exports = { client, connectDB }; ``` | Função para conectar ao banco com tratamento de erros |

📝 Criação do Arquivo Principal (index.js)
| Passo | Código / Ação | Observação |
|-------|---------------|------------|
| Importar database.js | `const { client, connectDB } = require('./database');` | Função de conexão e client para CRUD |
| Criar função main | ```javascript const readline = require('readline-sync'); async function main() { await connectDB(); const db = client.db('meubanco'); const usuarios = db.collection('usuarios'); let opcao; do { console.log('1 - Inserir usuário'); console.log('2 - Listar usuários'); console.log('3 - Atualizar usuário'); console.log('4 - Deletar usuário'); console.log('0 - Sair'); opcao = readline.question('Escolha uma opção: '); switch(opcao) { case '1': const nome = readline.question('Nome: '); const email = readline.question('Email: '); await usuarios.insertOne({ nome, email }); console.log('Usuário inserido!'); break; case '2': const lista = await usuarios.find({}).toArray(); console.log(lista); break; case '3': const nomeAntigo = readline.question('Nome a atualizar: '); const novoEmail = readline.question('Novo email: '); await usuarios.updateOne({ nome: nomeAntigo }, { $set: { email: novoEmail } }); console.log('Usuário atualizado!'); break; case '4': const nomeDeletar = readline.question('Nome a deletar: '); await usuarios.deleteOne({ nome: nomeDeletar }); console.log('Usuário deletado!'); break; case '0': console.log('Saindo...'); break; default: console.log('Opção inválida!'); } } while(opcao !== '0'); await client.close(); } main(); ``` | Função principal que executa CRUD interativo via terminal |
| Adicionar script no package.json | `"test": "node index.js"` | Permite rodar `npm test` para executar o projeto |

🐋 CRUD Básico via Node.js
| Operação | Comando / Código | Observação |
|----------|-----------------|------------|
| Inserir usuário | `await usuarios.insertOne({ nome: "Ana", email: "ana@iesb.br" })` | Adiciona um documento na coleção `usuarios` |
| Listar usuários | `await usuarios.find({}).toArray()` | Retorna todos os documentos |
| Buscar usuário | `await usuarios.find({ nome: "Geraldo" }).toArray()` | Retorna documentos filtrados |
| Atualizar usuário | `await usuarios.updateOne({ nome: "Ana" }, { $set: { email: "ana.nova@iesb.br" } })` | Atualiza campos do documento |
| Deletar usuário | `await usuarios.deleteOne({ nome: "Ana" })` | Remove documento da coleção |

🔍 Observações sobre CRUD
- `db.collection('usuarios')` seleciona a coleção.  
- Operações retornam **Promises**, por isso usamos `await`.  
- Sempre feche a conexão com `client.close()` após o uso.  
- Em produção, recomenda-se usar variáveis de ambiente para URL e credenciais.  

🧠 Explicações Adicionais
- `async/await` facilita lidar com operações assíncronas.  
- `readline-sync` permite criar menus e capturar inputs pelo terminal.  
- O MongoDB Atlas fornece cluster na nuvem, então a URL precisa de IP liberado para acesso.  
- Evite usar permissões administrativas em usuários de aplicação.


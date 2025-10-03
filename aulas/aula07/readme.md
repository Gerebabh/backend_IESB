# 🚀 Comandos Essenciais: Docker Compose e Shell de Banco de Dados (MongoDB/javascriptDB)

Este guia rápido contém os comandos mais utilizados para gerenciar um serviço de banco de dados via Docker Compose e interagir com ele através de sua shell (baseada em JavaScript, como a do MongoDB).

---

## ⚙️ Configuração (docker-compose.yaml)

O ambiente de trabalho é definido pelo seguinte serviço, que utiliza o nome de container **`meumongo`**:

```yaml
services:
  db:
    image: mongodb/mongodb-community-server:7.0-ubuntu2204
    container_name: meumongo
    ports:
      - "27017:27017"
    volumes:
      - ./:/data/db
    tty: true
    stdin_open: true
```

## 🐋 Gerenciamento do Container com Docker Compose

| Tarefa | Comando |
| :--- | :--- |
| **Subir** os serviços em background | `docker compose up -d` |
| **Acessar** a shell interativa (como a `mongo` ou `mongosh`) do container `db` | `docker compose exec db javascriptsh` |
| **Parar** e **remover** os containers, redes e volumes | `docker compose down -v` |

---

## 💻 Comandos Básicos da Shell do Banco de Dados

### 🏦 Gerenciamento de Bancos de Dados (DBs)

| Tarefa | Comando | Observação |
| :--- | :--- | :--- |
| **Mostrar** todos os bancos existentes | `show dbs` | |
| **Utilizar** o banco de dados `local` | `use local` | |
| **Criar/Mudar** para o banco de dados `meubanco` | `use meubanco` | Se não existir, ele será criado na primeira inserção de dados. |

### 📂 Gerenciamento de Coleções (Tabelas/Entidades)

| Tarefa | Comando |
| :--- | :--- |
| **Ver** as coleções (tabelas) no DB atual | `show collections` |

### CRUD Básico na Coleção `usuarios`

Todos os comandos abaixo são executados a partir do objeto `db`, após ter selecionado um banco de dados (ex: `use meubanco`).

| Operação | Descrição | Comando de Exemplo |   
| :--- | :--- | :--- |
| **CREATE** (Inserir 1) | Insere um novo documento. | `db.usuarios.insertOne({ nome: "Ana", email: "ana@iesb.br" })` |
| **READ** (Listar Todos) | Busca todos os documentos na coleção. | `db.usuarios.find({})` |
| **READ** (Busca Filtrada) | Busca documentos que correspondam ao filtro. | `db.usuarios.find({ nome: "Geraldo Lucio" })` |
| **UPDATE** (Atualizar 1) | Atualiza o primeiro documento que corresponde ao filtro. | `db.usuarios.updateOne({ nome: "Ana" }, { $set: { email: "ana.nova@iesb.br" } })` |
| **DELETE** (Deletar 1) | Remove o primeiro documento que corresponde ao filtro. | `db.usuarios.deleteOne({ nome: "Ana" })` |

---

## 🔍 Busca Avançada com Projeção

A projeção permite selecionar quais campos (colunas) devem ser incluídos ou omitidos no resultado da busca.

| Tarefa | Comando de Exemplo | Resultado |
| :--- | :--- | :--- |
| Busca com **omissão de campos** | `db.usuarios.find({}, { _id: 0, nome: 1 })` | Retorna **todos** os usuários, mostrando **somente o campo `nome`** e omitindo o campo `_id`. |

### 🧠 Explicação da Projeção

* **`{}`** $\rightarrow$ **Filtro Vazio**: Significa buscar **todos** os documentos da coleção.
* **`{ _id: 0, nome: 1 }`** $\rightarrow$ **Projeção**: O segundo argumento de `find()` define a inclusão ou omissão de campos:
    * **`0`** significa **omitir** o campo.
    * **`1`** significa **incluir** o campo.
* ⚠️ **Importante**: O campo de identificador único neste tipo de DB é chamado **`_id`** (com underscore), não apenas `id`.
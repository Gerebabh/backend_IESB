const readline = require('readline-sync');
const conecta = require("./database") ; //supertest só funciona com essa sintaxe de importação de módulos. 


//inserir dentro de uma coleção 

async function inserir(nomeTarefa) {  
const db = await conecta(); 

const collection =  db.collection('tarefas'); // ainda não cria nada, só se der algum insert. 

const resultado = await collection.insertOne({
    nome: nomeTarefa, 
    concluida: false 
}); 
//nesse comando acima ele cria o banco, cria o collection e insere o objeto na collection(faz tudo em cascata). 
console.log('Tarefa criada com sucesso', resultado); 
}; 

async function buscar(nomeTarefa) { 
    const db = await conecta() ; // se ja tiver conectado ele reaproveita 
    const collection =  db.collection('tarefas');  // se ja tiver aberto ele reaproveita. 
    const resultado = await collection.findOne({nome: nomeTarefa}); 
    console.log(resultado)
}; 

async function alterar(nomeTarefa, nomeAlterado, concluidaAlterado){
    const db = await conecta(); 
    const collection = db.collection('tarefas'); 
    const resultado = await collection.updateOne({nome: nomeTarefa}, 
        {$set: {
            nome: nomeAlterado, 
            concluida: concluidaAlterado, 
        }}) ; 
        console.log(resultado)
}; 

async function remover(nomeTarefa){ 
    const db = await conecta() ; 
    const collection = db.collection('tarefas'); 
    await collection.deleteOne({nome: nomeTarefa}); 
}


async function main() { 
    while(true) { 
        console.log('Menu Principal'); 
        console.log('1 - Criar tarefa'); 
        console.log('2 - Buscar tarefa'); 
        console.log('3 - Alterar tarefa'); 
        console.log('4 - Remover tarefa'); 
        console.log('5 - Sair'); 
        const opcao = readline.question('Entre com sua opção: ') ; 

        switch(parseInt(opcao)) { 
            case 1:{
                const nome = readline.question("Informe o nome da tarefa: "); 
                await inserir(nome); 
                break ; 
            }; 
            case 2 :{
                const tarefa = readline.question("Informa o nome da tarefa que deseja buscar: "); 
                await buscar(tarefa); 
                break; 
            } ; 
            case 3 :{
                const tarefa = readline.question("Informe o nome da tarefa que deseja alterar: "); 
                const nomeTarefa = readline.question("Informe o nome que quer passar para a nova tarefa: "); 
                const statusTarefa = readline.question("Informe o status da nova tarefa: "); 
                await alterar(tarefa, nomeTarefa, statusTarefa); 
                break; 
            }; 
            case 4 :{
                const tarefa = readline.question("Informe o nome da tarefa que deseja remover: "); 
                await remover(tarefa); 
                break; 
            }  ; 
            case 5 : process.exit(0); 
        }
    }
}; 

main(); 
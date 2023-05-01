const mongoose = require('mongoose');
require('dotenv').config();

async function conectaBancoDeDados() {

    try {
        console.log('Conexão com o banco de dados iniciada')

        //.connect(string de conexão, ) é uma função de dentro do pacote mongoose
        await mongoose.connect(process.env.MONGO_URL)
        //como estamos nos conectado com um banco de dados externo e que fica na nuvem, a resposta não vai ser imediata
        //por isso criamos a função async e usamos await
    
        console.log('Conexão com o banco de dados feita com sucesso')
    } catch(err) {
        console.log(err);
    };
   
}

module.exports = conectaBancoDeDados
//comando pronto do NodeJS
//o NodeJS trabalha com pacotes ou módulos
//às vezes é necessário usar módulos criados em um arquivo em outro arquivo
//usando o module.exports = nomeDaFunção, conseguimos deixar nossa função, ou módulo, disponível para ser utilizado por outros arquivos
//no outro arquivo, usar require para importar o módulo, por exemplo: const conectaBancoDeDados = require('path do arquivo'), pode ser path relativo
//no caso, const conectaBancoDeDados = require('./bancoDeDados.js'), porque está na mesma pasta
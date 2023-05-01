const express = require("express"); //aqui estou iniciando o express
const router = express.Router(); //aqui estou configurando a primeira parte da rota
//const { v4: uuidv4 } = require('uuid'); //instalando a biblioteca que gera ID's únicas
//biblioteca não é mais necessária pois a id única será gerada pelo mongoDB
const cors = require('cors')//trazendo o pacote CORS, que permite consumir essa API no frontend

const conectaBancoDeDados = require('./bancoDeDados.js') //importa o módulo do outro arquivo que criamos, passando o path relativo
conectaBancoDeDados();

const Mulher = require('./mulherModel.js') //importação do modelo do objeto "mulher", criado no arquivo mulherModel.js

const app = express(); //inicialização do app
app.use(express.json());//libera o JSON para ser usado na tráfego de dados da request
app.use(cors());//libera a aplicação, nossa API, para ser usada a partir do frontend
const porta = 3333;// criação da porta

//deletada a lista inicial de mulheres previamente criada

//GET
async function mostraMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find();

        response.json(mulheresVindasDoBancoDeDados)

    } catch (err) {
        console.log(err)
    }
};

//POST
async function criaMulher(request, response) {
    
    const novaMulher = new Mulher({ //para gerar um novo objeto seguindo o modelo criado e importado no mulherModel.js
        //id: uuidv4(), //não é mais necessário, pois o id vai ser criado pelo mongoDB
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    });

    //o try só precisa envolver a parte do código que está se comunicando com o servidor externo
    //no caso, a chamada da função mongoose.save(), para o objeto Mulher criado a partir da importação do modelo criado com o mongoose
    //no arquivo mulherModel.js
    try{
        const mulherCriada = await novaMulher.save();
        response.status(201).json(mulherCriada)
        //no HTTP, status 201 quer dizer "resposta criada"

    } catch (err) {
        console.log(err);
    };

    
};

//PATCH
async function corrigeMulher(request, response) {
    
    //toda essa função vai ser substituída pelo código que usa as funções do mongoose para encontrar as infos no banco de dados
    // function encontraMulher(mulher){
    //     if(mulher.id === request.params.id){
    //         return mulher
    //     };
    // };

    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)
        //findById(onde o id vai ser informado na requisição) é uma função do mongoose
        //usamos ainda o request.params.id, pois o id vai ser informado na URL

        if(request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        };
    
        if(request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem
        };
    
        if(request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio
        };

        if(request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao
        };

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
        //ele sabe onde salvar porque já está definido no modelo Mulher, que tem o nome da coleção do MongoDB
        response.json(mulherAtualizadaNoBancoDeDados);

    } catch (err) {

    };

};

//DELETE
async function deletaMulher(request, response) {
    //função vai ser substituida por uma função do mongoose
    // function todasMenosEla(mulher) {
    //     if(mulher.id !== request.params.id) {
    //         return mulher
    //     };
    // };

    try {

        await Mulher.findByIdAndDelete(request.params.id);
        //findByIdAndDelete(onde encontrar a id) é uma função do mongoose

        response.json({ mensagem: 'Mulher deletada com sucesso!'})

    } catch (err) {
        console.log(err);
    };

};

//PORTA
function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta);
};


app.use(router.get('/mulheres', mostraMulheres)); //configuração rota GET/mulheres
app.use(router.post('/mulheres', criaMulher)) // configuração rota POST/mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)); //configuração rota PATCH/mulheres/:id
app.use(router.delete('/mulheres/:id', deletaMulher)); //configuração rota DELETE/mulheres/:id
//liga a aplicação e liga o servidor
app.listen(porta, mostraPorta);
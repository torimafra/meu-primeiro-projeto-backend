const express = require("express");
const router = express.Router(); //atribuir configuração de rota que já vem do express

const app = express();
const porta = 3333;

function mostraOla(request, response) { //funções associadas ao verbo vão sempre receber os parâmetros request e response
    response.send("Olá, mundo!");
};

function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta);
};

//criar o endereço /ola, e estabelecer que quando ele é acessado, a função definida é executada
app.use(router.get('/ola', mostraOla));

app.listen(porta, mostraPorta);
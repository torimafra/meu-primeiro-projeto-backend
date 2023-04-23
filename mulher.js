const express = require("express");
const router = express.Router();

const app = express();
const porta = 3333;

function mostraMulher(request, response) { //função que se refere a um verbo precisa dos parâmetros request e response

    //para enviar múltiplas informações, criar um objeto
    //json é uma forma de enviar pela internet múltiplas informações

    response.json({
        nome: 'Simara Conceição',
        imagem: 'https:/github.com/simaraconceicao.png',
        minibio: 'Desenvolvedora e instrutora'
    })
};

function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta);
};

app.use(router.get('/mulher', mostraMulher));
app.listen(porta, mostraPorta);
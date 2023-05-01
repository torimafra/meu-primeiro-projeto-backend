const mongoose = require('mongoose'); //precisa ser importado para cada arquivo individual que precisar usar ele

const MulherSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },

    imagem: {
        type: String,
        required: true
    },

    citacao: {
        type: String,
        required: true
    },

    minibio: {
        type: String,
        required: true
    }
});

//usando uma funçao do mongoose model('criarNomeDaLista', formato dos objetos da lista)
module.exports = mongoose.model('diva', MulherSchema);
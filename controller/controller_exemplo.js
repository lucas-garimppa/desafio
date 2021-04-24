var db = require('../database/db_exemplo.js');

exports.get = async function (req, res) {
    const params = Object.assign({}, req.params, req.query, req.body);
    
    let retorno = await db.get(params.id);

    return retorno;
}

exports.insert = async function (req, res) {
    const params = Object.assign({}, req.params, req.query, req.body);

    validaCadastro(params);

    return db.insere(params.propriedade_1, params.propriedade_2);
};

function validaCadastro(params) {
    console.log(params);

    if (!params.propriedade_1) 
        throw 'Propriedade 1 não definida.';

    if (!params.propriedade_2) 
        throw 'Propriedade 2 não definida.';
}

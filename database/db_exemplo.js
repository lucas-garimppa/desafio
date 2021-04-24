const util = require("../server/util");

module.exports.get = async function (exemplo_id) {
    const Parse = util.configuraParse();

    const Assinatura = Parse.Object.extend('Exemplo');
    var query = new Parse.Query(Assinatura);
    query.equalTo("objectId", exemplo_id);

    return await query.first()
}

module.exports.insere = async function (propriedade_1, propriedade_2) {
    const Parse = util.configuraParse();

    const Exemplo = Parse.Object.extend('Exemplo');
    const obj = new Exemplo();
    obj.set('propriedade_1', propriedade_1);
    obj.set('propriedade_2', propriedade_2);

    return await obj.save();
}
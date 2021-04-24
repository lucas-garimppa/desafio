function formata_data(data) {
    if (data == null)
        return 'Sem data';

    let yourDate = new Date(Date.parse(data));
    return yourDate.toLocaleDateString('pt-BR') + ' ' + yourDate.toLocaleTimeString('pt-BR');
}

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function makeid(length = 20) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++)
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
}

function redirectPost(url, data) {
    const form = document.createElement('form');
    document.body.appendChild(form);
    form.method = 'post';
    form.action = url;
    for (const name in data) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = data[name];
        form.appendChild(input);
    }
    form.submit();
}

function formataCPF(cpf) {
    //retira os caracteres indesejados...
    cpf = cpf.replace(/[^\d]/g, "");

    //realizar a formatação...
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function capitalize(string) {
    if (!string) return null;

    return string.charAt(0).toUpperCase() + string.slice(1);
}

function retornaCartaoBandeira(numero) {
    /*
    Amex: /^3[47][0-9]{13}/
    Aura: '^507860'
    Banese Card: '^636117'
    Cabal: '(60420[1-9]|6042[1-9][0-9]|6043[0-9]{2}|604400)'
    Diners: '(36[0-8][0-9]{3}|369[0-8][0-9]{2}|3699[0-8][0-9]|36999[0-9])
    Discover: /^6(?:011|5[0-9]{2})[0-9]{12}/
    Elo: '^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^504175|^627780|^63(6297|6368|6369)|(65003[5-9]|65004[0-9]|65005[01])|(65040[5-9]|6504[1-3][0-9])|(65048[5-9]|65049[0-9]|6505[0-2][0-9]|65053[0-8])|(65054[1-9]|6505[5-8][0-9]|65059[0-8])|(65070[0-9]|65071[0-8])|(65072[0-7])|(65090[1-9]|6509[1-6][0-9]|65097[0-8])|(65165[2-9]|6516[67][0-9])|(65500[0-9]|65501[0-9])|(65502[1-9]|6550[34][0-9]|65505[0-8])|^(506699|5067[0-6][0-9]|50677[0-8])|^(509[0-8][0-9]{2}|5099[0-8][0-9]|50999[0-9])|^65003[1-3]|^(65003[5-9]|65004\d|65005[0-1])|^(65040[5-9]|6504[1-3]\d)|^(65048[5-9]|65049\d|6505[0-2]\d|65053[0-8])|^(65054[1-9]|6505[5-8]\d|65059[0-8])|^(65070\d|65071[0-8])|^65072[0-7]|^(65090[1-9]|65091\d|650920)|^(65165[2-9]|6516[6-7]\d)|^(65500\d|65501\d)|^(65502[1-9]|6550[3-4]\d|65505[0-8])'
    Fort Brasil: '^628167'
    GrandCard: '^605032'
    Hipercard: '^606282|^637095|^637599|^637568'
    JCB: /^(?:2131|1800|35\d{3})\d{11}/
    Mastercard: /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/
    Personal Card: '^636085'
    Sorocred: '^627892|^636414'
    Valecard: '^606444|^606458|^606482'
    Visa: /^4[0-9]{12}(?:[0-9]{3})/
    */

    // Aceitos pela gerencianet

    // visa        // Bandeira Visa
    let visa = new RegExp('/^4[0-9]{12}(?:[0-9]{3})/')

    //mastercard  // Bandeira MasterCard
    let mastercard = new RegExp('/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/');

    // diners      // Bandeira Dinners
    let diners = new RegExp('(36[0-8][0-9]{3}|369[0-8][0-9]{2}|3699[0-8][0-9]|36999[0-9])');

    // amex        // Bandeira AmericanExpress
    let amex = new RegExp('/^3[47][0-9]{13}/')

    // elo         // Bandeira Elo
    let elo = new RegExp('^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^504175|^627780|^63(6297|6368|6369)|(65003[5-9]|65004[0-9]|65005[01])|(65040[5-9]|6504[1-3][0-9])|(65048[5-9]|65049[0-9]|6505[0-2][0-9]|65053[0-8])|(65054[1-9]|6505[5-8][0-9]|65059[0-8])|(65070[0-9]|65071[0-8])|(65072[0-7])|(65090[1-9]|6509[1-6][0-9]|65097[0-8])|(65165[2-9]|6516[67][0-9])|(65500[0-9]|65501[0-9])|(65502[1-9]|6550[34][0-9]|65505[0-8])|^(506699|5067[0-6][0-9]|50677[0-8])|^(509[0-8][0-9]{2}|5099[0-8][0-9]|50999[0-9])|^65003[1-3]|^(65003[5-9]|65004\d|65005[0-1])|^(65040[5-9]|6504[1-3]\d)|^(65048[5-9]|65049\d|6505[0-2]\d|65053[0-8])|^(65054[1-9]|6505[5-8]\d|65059[0-8])|^(65070\d|65071[0-8])|^65072[0-7]|^(65090[1-9]|65091\d|650920)|^(65165[2-9]|6516[6-7]\d)|^(65500\d|65501\d)|^(65502[1-9]|6550[3-4]\d|65505[0-8])')

    // hipercard   // Bandeira Hipercard
    let hipercard = new RegExp('^606282|^637095|^637599|^637568');

    // get rid of anything but numbers
    numero = numero.replace(/\D/g, '');

    if (numero.match(visa))
        return 'visa';

    if (numero.match(mastercard))
        return 'mastercard';

    if (numero.match(diners))
        return 'diners';

    if (numero.match(amex))
        return 'amex';

    if (numero.match(elo))
        return 'elo';

    if (numero.match(hipercard))
        return 'hipercard';

    return 'desconhecido';
}
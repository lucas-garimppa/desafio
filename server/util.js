const Parse = require('parse/node');

module.exports = {
    limpa: function (text) {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    },

    capitalize: function (text) {
        if (text === undefined) return text;

        return text
            .toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    },

    ajustaHoraBr: function (datahora) {
        if (datahora === undefined) return '';

        // ajuste do fuso horário
        var dt = datahora.toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            hour12: false,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });

        dt = dt.split(' ');

        if (dt[0].indexOf('-') >= 0) {

            let d = dt[0].split('-');
            let t = dt[1].split(':');

            return d[2] + '/' + d[1] + '/' + d[0] + ' ' + t[0] + ':' + t[1];
        }

        if (dt[0].indexOf('/') >= 0) {

            let d = dt[0].split('/');
            let t = dt[1].split(':');

            return d[0] + '/' + d[1] + '/' + d[2] + ' ' + t[0] + ':' + t[1];
        }

        return dt;
    },

    ajustaHoraBrYYYYMMDD: function (datahora) {
        if (datahora === undefined) return '';

        // ajuste do fuso horário
        var dt = datahora.toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            hour12: false,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });

        if (dt.indexOf('-') > 0)
            return dt;

        dt = dt.split(' ');

        let d = dt[0].split('/');
        let t = dt[1];

        let r = d[2] + '-' + d[1] + '-' + d[0] + ' ' + t;

        return r;
    },

    ajustaHoraBrDate: function (datahora) {
        if (datahora === undefined) return '';

        datahora.setHours(datahora.getHours() - 3);
        return datahora;
    },

    makeid: function (length) {
        var result = '';
        var characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++)
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );

        return result;
    },

    /**
     * @returns {Parse}
     */
    configuraParse: () => {
        Parse.initialize(process.env.PARSE_INIT);
        Parse.serverURL = 'https://parseapi.back4app.com/';
        Parse.javaScriptKey = process.env.PARSE_KEY;
        return Parse;
    },

};

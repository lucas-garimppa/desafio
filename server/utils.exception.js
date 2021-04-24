/**
 *
 * @param {any} recebido variável que se quer testar
 * @param  {...any} esperado tipos que são esperados para a variável informada
 * @returns {boolean} retorna `true` se o tipo recebido corresponde a algum tipo esperados
 */
exports.validaTipo = (recebido, ...esperado) => {
    if (recebido === null) {
        if (esperado.includes(null)) {
            return true;
        }
        return false;
    } else if (recebido === undefined) {
        if (esperado.includes(undefined)) {
            return true;
        }
        return false;
    } else if (recebido !== recebido) {
        /**
         * https://tc39.es/ecma262/#sec-isnan-number
         *
         * `NaN === Number`
         */
        const _nan = esperado.find((c) => c !== c);
        if (_nan !== _nan) {
            /**NaN é um valor esperado */
            return true;
        }
        return false;
        // eslint-disable-next-line no-extra-boolean-cast
    } else if (!!esperado.find((c) => recebido.constructor === c)) {
        return true;
    }
    return false;
};

/**
 * Throws `TypeError` caso o tipo recebido não corresponde aos esperados
 *
 * @param {any} recebido
 * @param  {...any} esperado
 * @returns {boolean | TypeError} retorna `true` se o valor corresponde aos tipos esperados, caso contrário joga um erro
 */
exports.validaTipoOuThrow = (recebido, ...esperado) => {
    const ok = module.exports.validaTipo(recebido, ...esperado);
    if (ok) return ok;
    throw new TypeError('Tipo recebido não corresponde aos tipos esperados');
};

/**
 * Middleware Wrapper `try/catch`
 * @param {(req: Express.Request, res?: Express.Response, next?: Function) => Promise<any>} middleware
 * @returns {(req: Express.Request, res: Express.Response, next: Function) => Promise<any>}
 */
exports.middewareWrapper = (middleware) => {
    return async (req, res, next) => {
        try {
            const resultado = await middleware(req, res, next);

            if (!resultado)
                return res.end();

            if (module.exports.validaTipo(resultado, Object) || resultado.constructor.name === 'ParseObjectSubclass') {
                if (resultado.erro)
                    return res.status(400).send(resultado);

                return res.end(JSON.stringify(resultado));
            } else {
                return res.end(resultado);
            }

        } catch (error) {
            console.log("Erro middleware: " + JSON.stringify(error));
            console.log( error.stack )

            return res.status(400).send(error.toString());
            // return next(error);
        }
    };
};

exports.HttpStatus = {
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,
    PROCESSING: 102,
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NON_AUTHORITATIVE_INFORMATION: 203,
    NO_CONTENT: 204,
    RESET_CONTENT: 205,
    PARTIAL_CONTENT: 206,
    AMBIGUOUS: 300,
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    SEE_OTHER: 303,
    NOT_MODIFIED: 304,
    TEMPORARY_REDIRECT: 307,
    PERMANENT_REDIRECT: 308,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    PROXY_AUTHENTICATION_REQUIRED: 407,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    LENGTH_REQUIRED: 411,
    PRECONDITION_FAILED: 412,
    PAYLOAD_TOO_LARGE: 413,
    URI_TOO_LONG: 414,
    UNSUPPORTED_MEDIA_TYPE: 415,
    REQUESTED_RANGE_NOT_SATISFIABLE: 416,
    EXPECTATION_FAILED: 417,
    I_AM_A_TEAPOT: 418,
    MISDIRECTED: 421,
    UNPROCESSABLE_ENTITY: 422,
    FAILED_DEPENDENCY: 424,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    HTTP_VERSION_NOT_SUPPORTED: 505,
};

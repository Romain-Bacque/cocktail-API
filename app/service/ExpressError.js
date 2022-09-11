
class ExpressError extends Error {
    message;
    statusCode;
    /**
     * créé une erreur 'personnalisée'
     * @param {String} message message concernant l'erreur
     * @param {Number} statusCode http status code concernant l'erreur
     */
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;
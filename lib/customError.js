/**
 *Create a custom error class extending JS "Error" class for error
 *
 * @class CustomError
 * @extends {Error}
 */
 class CustomError extends Error {
    /**
     *Creates an instance of CustomError.
     * @param {*} errorObj - JS error object
     * @param {*} options - options to overwrite error properties(message, code, status)
     * @memberof CustomError
     */
    constructor(errorObj, options = {}) {
        let message = null;
        if (typeof errorObj == 'string')
            message = errorObj;
        super(message || errorObj.message || options.message);
        this.code = Number(errorObj.code) || Number(errorObj.status) || Number(options.code) || 500;
        this.stack = errorObj
    }
}

module.exports = CustomError;
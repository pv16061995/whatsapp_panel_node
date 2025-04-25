const CustomError = require('./customError');

/**
 *Convert response to a common reponse format
 *
 * @param {object} response
 * @returns{object} formatted response
 */
function formatResponse(response, customMessage) {

    if (response instanceof CustomError) {

        return {
            message: customMessage || response.message,
            data: null,
            error: { code: Number(response.code) || 500, stack: response.stack }
        }
    }

    return {
        message: customMessage || response.message || "",
        data: (response && response.data) ? response.data : response || response || {},
        // error: null
    }
};


module.exports = formatResponse;

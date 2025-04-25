const responseHandler = require("./responseHandler");
/**
 * function to formate the response
 * @param {number} httpCode 
 * @param {object} responseBody 
 * @param {object} responseHeader 
 * @returns Object which contain httpCode, responseBody, responseHeader 
 */
function getResponseHttpCode(httpCode=400, responseBody,responseHeader) {
    if (!responseBody) {
        responseBody = responseHandler("","please provide valid details.");
    }
    return { httpCode, responseBody, responseHeader };
}

module.exports = getResponseHttpCode;

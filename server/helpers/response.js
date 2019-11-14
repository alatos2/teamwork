/**
 * @class Responses
 * @description An utility class to handle responses
 * @exports Responses
 */
export default class Responses {
  /**
     * @method constructor
     */
  constructor() {
    this.statusCode = null;
    this.type = null;
    this.data = null;
    this.message = null;
  }

  /**
     * @method setSuccess
     * @description Set success responses
     * @static
     * @param {object} statusCode
     * @param {object} message
     * @param {object} data
     * @returns {undefined}
     * @memberof Responses
     */
  static setSuccess(statusCode, data = undefined) {
    this.statusCode = statusCode;
    this.data = data;
    this.type = 'success';
  }

  /**
     * @method setError
     * @description Set error responses
     * @static
     * @param {object} statusCode
     * @param {object} message
     * @returns {undefined}
     * @memberof Responses
     */
  static setError(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
    this.type = 'error';
  }

  /**
     * @method send
     * @description Sends response messages
     * @static
     * @param {object} res - Response object
     * @returns {object} JSON response
     * @memberof Responses
     */
  static send(res) {
    const result = { status: this.type, data: this.data };
    const output = res.status(this.statusCode);
    const response = this.type === 'success' ? output.json(result)
      : output.json({ status: this.type, error: this.message });
    return response;
  }
}

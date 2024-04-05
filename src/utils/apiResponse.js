class ApiResponse {
    constructor(statusCode, message, data = {}, error = []) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data
        this.error = error

    }
}
module.exports = { ApiResponse }
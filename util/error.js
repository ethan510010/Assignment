class APIError extends Error {
  constructor(msg, statusCode) {
    super();
    this.msg = msg;
    this.statusCode = statusCode;
  }
}

module.exports = APIError;

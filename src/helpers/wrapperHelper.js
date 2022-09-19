module.exports = {
  response: (response, success, status, message, data) => {
    const result = {};
    result.success = success;
    result.status = status || 200;
    result.message = message;
    result.data = data;

    return response.status(result.status).json(result);
  },
};
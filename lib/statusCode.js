module.exports = {
  SUCCESS: {
    status: 200,
    message: 'Success'
  },
  NO_CONTENT: {
    status: 204,
    message: 'No Result Found',
  },
  INTERNAL: {
    status: 500,
    message: 'Internal server error',
  },
  UNAUTHORIZED: {
    status: 401,
    message: 'Unauthorized access',
  },
  NOT_IMPLEMENTED: {
    status: 501,
    message: 'Resource method not implemented',
  },
  INVALID_INPUT: {
    status: 400,
    message: 'Invalid input in request',
  },
  NOT_FOUND: {
    status: 404,
    message: 'No such resource exists',
  },
  NOT_ALLOWED: {
    status: 403,
    message: 'Operation not allowed',
  },
  NO_ACCESS: {
    status: 403,
    message: 'Access not allowed',
  },
  ALREADY_EXISTS: {
    status: 409,
    message: 'Resource already exists',
  },
  SIZE_LIMIT: {
    status: 413,
    message: 'Input size exceeds allowed limits',
  },
  UNPROCESSABLE_ENTITY: {
    status: 422,
    message: 'Unable to be processed',
  },
};

const SUCCESS_MESSAGE = 'Yay, success load data.';
const ERROR_MESSAGE = 'Oops, failed load data.';
const VALIDATION_MESSAGE = 'Oops, validation error.';

exports.successResponse = (res, data = null, message = SUCCESS_MESSAGE) => {
  return res.status(200).json({
    status: true,
    message: message,
    data: data,
  });
};

exports.errorResponse = (res, message = ERROR_MESSAGE) => {
  return res.status(500).json({
    status: false,
    message: message,
    data: null,
  });
};

exports.validationResponse = (res, data, message = VALIDATION_MESSAGE) => {
  return res.status(400).json({
    status: false,
    message: message,
    data: data,
  });
};

exports.notFoundResponse = (res, message) => {
  return res.status(404).json({
    status: false,
    message: message,
  });
};

exports.unauthorizedResponse = (res, message) => {
  return res.status(401).json({
    status: false,
    message: message,
  });
};

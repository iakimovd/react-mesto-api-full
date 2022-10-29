const NOT_FOUND_CODE = 404;

const SERVER_ERROR_CODE = 500;

const VALIDATION_ERROR_CODE = 400;

const urlRegex = /(ftp|http|https):\/\/([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

module.exports = {
  NOT_FOUND_CODE, SERVER_ERROR_CODE, VALIDATION_ERROR_CODE, urlRegex,
};

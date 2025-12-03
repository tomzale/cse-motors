// Intentional Error Controller
const errorController = {};

errorController.triggerError = async function (req, res, next) {
  // This will throw a 500 error
  throw new Error("Intentional server error triggered from footer link");
};

module.exports = errorController;
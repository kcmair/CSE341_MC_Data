const validator = require('../helpers/validate');

const validateBike = async (req, res, next) => {

  const validationRule = {
    "make": "required|string",
    "model": "required|string",
    "year": "required|integer",
    "motor": "string",
    "displacement": "string",
    "transmission": "string",
    "drive": "string",
    "terrain": "required|string"
  }

  await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412)
        .send({
          success: false,
          message: 'Validation failed',
          data: err
        });
    } else {
      next();
    }
  }).catch(err => console.log(err))
}

module.exports = { validateBike };
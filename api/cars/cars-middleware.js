const Car = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  try {
    const car = await Car.getById(req.params.id);
    if (!car) {
      next({
        status: 404,
        message: `car with id ${req.params.id} not found`,
      });
    } else {
      req.car = car;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  const requiredFields = ['vin', 'make', 'model', 'mileage'];
  if (!requiredFields.every((field) => req.body[field])) {
    next({
      status: 400,
      message: `${requiredFields
        .filter((field) => !req.body[field])
        .join(' ')} is missing`,
    });
  } else {
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body;
  if (vinValidator.validate(vin)) {
    next();
  } else {
    next({
      status: 400,
      message: `vin ${vin} is invalid`,
    });
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const { vin } = req.body;
    const vinExists = await Car.getByVin(vin);
    if (!vinExists) {
      next();
    } else {
      next({
        status: 400,
        message: `vin ${vin} already exists`,
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};

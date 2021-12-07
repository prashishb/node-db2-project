const express = require('express');
const Car = require('./cars-model');
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require('./cars-middleware');

const router = express.Router();

// [GET] /api/cars
router.get('/', async (req, res, next) => {
  try {
    const cars = await Car.getAll();
    res.json(cars);
  } catch (err) {
    next(err);
  }
});

// [GET] /api/cars/:id
router.get('/:id', checkCarId, async (req, res) => {
  res.json(req.car);
});

// [POST] /api/cars
router.post(
  '/',
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  async (req, res, next) => {
    try {
      const car = await Car.create(req.body);
      res.json(car);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;

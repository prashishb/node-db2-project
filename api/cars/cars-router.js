const express = require('express');
const Car = require('./cars-model');

const router = express.Router();

// [GET] /api/cars
router.get('/', async (req, res, next) => {
  res.json('Get all cars');
});

// [GET] /api/cars/:id
router.get('/:id', async (req, res, next) => {
  res.json('Get car by id');
});

// [POST] /api/cars
router.post('/', async (req, res, next) => {
  res.json('Post new car');
});

module.exports = router;

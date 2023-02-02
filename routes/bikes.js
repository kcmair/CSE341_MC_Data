const express = require('express');
const router = express.Router();

const bikesController = require('../controllers/bikes');

router.get('/', bikesController.returnAllBikes);

router.get('/:id', bikesController.findBikeById);

router.post('/', bikesController.createBike);

router.put('/:id', bikesController.updateBike);

router.delete('/:id', bikesController.deleteBike);

module.exports = router;

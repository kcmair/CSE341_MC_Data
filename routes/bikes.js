const router = require('express').Router();
const bikesController = require('../controllers/bikes');
const validation = require('../middleware/validation-middleware');

router
  .get('/', bikesController.returnAllBikes)
  .get('/:id', bikesController.findBikeById)
  .post('/', validation.validateBike, bikesController.createBike)
  .put('/:id', bikesController.updateBike)
  .delete('/:id', bikesController.deleteBike);

module.exports = router;

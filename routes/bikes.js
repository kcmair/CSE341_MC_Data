const router = require('express').Router();
const bikesController = require('../controllers/bikes');
const validation = require('../middleware/validation-middleware');

router
  .get('/', bikesController.returnAllBikes)
  .get('/:id', bikesController.findBikeById)
  .post('/', validation.validateBike, bikesController.createBike)
  .put('/user', bikesController.updateUser)
  .put('/:id', validation.validateBike, bikesController.updateBike)
  .delete('/:id', bikesController.deleteBike);

module.exports = router;

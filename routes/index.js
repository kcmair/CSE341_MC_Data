const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const { ensureAuth } = require('../middleware/auth');

router
  .use('/bikes', ensureAuth, require('./bikes'))
  .use('/auth', require('./auth'))
  .use('/api-docs', swaggerUi.serve)
  .get('/api-docs', swaggerUi.setup(swaggerDocument));
module.exports = router;

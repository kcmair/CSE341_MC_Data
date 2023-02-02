const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    "title": "MC Database",
    "description": "A Database for Motorcycles",
  },
  host: 'localhost:8080',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
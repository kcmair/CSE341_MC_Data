const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    "title": "MC Database",
    "description": "A Database for Motorcycles",
  },
  host: 'cse341-mc-data.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Iron-Horse Database',
    description: 'A Database for Motorcycles',
  },
  host: 'localhost:8080',
  schemes: ['http'],
  // host: 'cse341-l6-um6z.onrender.com',
  // schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

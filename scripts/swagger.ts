import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'bff-file-handler',
    description: 'bff-file-handler'
  },
  host: 'localhost:3001'
};

const outputFile = './swagger-output.json';
const routes = ['../src/app.ts'];

swaggerAutogen()(outputFile, routes, doc);

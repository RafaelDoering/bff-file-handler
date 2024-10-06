import swaggerAutogen from 'swagger-autogen';

import { PORT } from '../src/env';

const doc = {
  info: {
    title: 'bff-file-handler',
    description: 'bff-file-handler'
  },
  host: `localhost:${PORT}`
};

const outputFile = './swagger-output.json';
const routes = ['../src/app.ts'];

swaggerAutogen()(outputFile, routes, doc);

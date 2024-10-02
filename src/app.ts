import express from 'express';
import bodyParser from 'body-parser';

import authRouter from './ui/routers/auth';
import docsRouter from './ui/routers/docs';

const app = express();

app.use(bodyParser.json());

app.use('/docs', docsRouter);
app.use('/auth', authRouter);

export default app;

import express from 'express';
import bodyParser from 'body-parser';

import docsRouter from './ui/routers/docs';
import healthRouter from './ui/routers/health';
import authRouter from './ui/routers/auth';
import fileRouter from './ui/routers/file';

const app = express();

app.use(bodyParser.json());

app.use('/docs', docsRouter);
app.use('/health', healthRouter);
app.use('/auth', authRouter);
app.use('/file', fileRouter);

export default app;

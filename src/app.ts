import express from 'express';
import bodyParser from 'body-parser';

import docsRouter from './ui/routers/docs';
import healthRouter from './ui/routers/health';
import authRouter from './ui/routers/auth';
import fileRouter from './ui/routers/file';
import rateLimiter from './ui/middlewares/rate-limiter';
import globalErrorHandler from './ui/middlewares/global-error-handler';

const app = express();

app.use(rateLimiter);

app.use(bodyParser.json());

app.use('/docs', docsRouter);
app.use('/health', healthRouter);
app.use('/auth', authRouter);
app.use('/file', fileRouter);

app.use(globalErrorHandler);

export default app;

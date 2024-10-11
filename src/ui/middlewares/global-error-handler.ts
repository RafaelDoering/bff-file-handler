import { StatusCode, Request, Response, Next, HttpError } from "../http-client";

export default function globalErrorHandler(err: HttpError, req: Request, res: Response, next: Next) {
  const statusCode = err.status || StatusCode.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({
    status: 'error',
    message: err.message,
  });
};

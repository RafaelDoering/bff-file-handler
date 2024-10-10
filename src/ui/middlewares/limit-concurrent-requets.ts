import { StatusCode, Request, Response, Next } from "../http-client";

let activeRequests = 0;
const MAX_CONCURRENT_REQUESTS = 5;

export default function limitConcurrentRequests(req: Request, res: Response, next: Next) {
  if (activeRequests >= MAX_CONCURRENT_REQUESTS) {
    res.status(StatusCode.TOO_MANY_REQUESTS).json('Too many requests, please try again later.');
    return;
  }

  activeRequests++;

  res.on('finish', () => {
    activeRequests--;
  });

  next();
}

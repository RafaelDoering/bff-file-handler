import 'dotenv/config';

const {
  PORT: port,
  MAX_OF_FILES_PER_UPLOAD: maxOfFilesPerUpload,
  TOKEN_PRIVATE_KEY: tokenPrivateKey,
  TOKEN_EXPIRES_IN: tokenExpiresIn,
  NODE_ENV: nodeEnv,
  LOG_PATH: logPath,
  STORAGE_PATH: storagePath,
  RATE_LIMIT_TIME_WINDOW_IN_MS: rateLimitTimeWindowInMs,
  RATE_LIMIT_MAX_REQUESTS_IN_TIME_WINDOW: rateLimitMaxRequestsInTimeWindow,
  GRAVATAR_URL: gravatarUrl,
} = process.env;

function toInteger(maybeNumber: any) {
  const number = parseInt(maybeNumber);
  if (isNaN(number)) {
    throw new Error();
  }

  return number;
}

export const PORT = toInteger(port);
export const MAX_OF_FILES_PER_UPLOAD = toInteger(maxOfFilesPerUpload);
export const TOKEN_PRIVATE_KEY = tokenPrivateKey;
export const TOKEN_EXPIRES_IN = tokenExpiresIn;
export const NODE_ENV = nodeEnv;
export const LOG_PATH = logPath;
export const STORAGE_PATH = storagePath;
export const RATE_LIMIT_TIME_WINDOW_IN_MS = toInteger(rateLimitTimeWindowInMs);
export const RATE_LIMIT_MAX_REQUESTS_IN_TIME_WINDOW = toInteger(rateLimitMaxRequestsInTimeWindow);
export const GRAVATAR_URL = gravatarUrl;

export const isProduction = NODE_ENV === 'production';

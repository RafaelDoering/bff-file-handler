import os from 'os';
import pino, { type Logger } from 'pino';

import LoggerPort from '../../app/ports/logger';

const LOG_PATH = 'logs/app.log';

const isProduction = process.env.NODE_ENV === 'production';

export default class PinoAdapter implements LoggerPort {
  private logger: Logger;

  constructor() {
    const baseConfig = {
      base: {
        hostname: os.hostname(),
      },
    };

    this.logger = isProduction
      ? pino({
        ...baseConfig,
        level: process.env.LOG_LEVEL || 'warn',
        transport: {
          target: 'pino/file',
          options: {
            destination: LOG_PATH,
          },
        },
      })
      : pino({
        ...baseConfig,
        level: 'debug',
      });
  }

  info(str: string): void {
    this.logger.info(str);
  }
}

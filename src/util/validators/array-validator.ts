import { body, ValidationChain } from 'express-validator';

import Validator from './validator';

export interface MinMaxOptions {
  min?: number;
  max?: number;
}

export default class StringValidator implements Validator {
  public body(fieldName: string, options?: MinMaxOptions): ValidationChain[] {
    let chain: ValidationChain[] = [];

    if (options.min) {
      chain.push(body(fieldName).isArray(options).withMessage(`${fieldName} need to have at least ${options.min} items`));
    }

    if (options.max) {
      chain.push(body(fieldName).isArray(options).withMessage(`${fieldName} need to have less than ${options.max} items`));
    }

    return chain;
  }
}

import { body, ValidationChain } from 'express-validator';

import Validator from './validator';

export interface MinMaxOptions {
  min?: number;
  max?: number;
}

export default class StringValidator implements Validator {
  public body(fieldName: string, options?: MinMaxOptions): ValidationChain[] {
    let chain: ValidationChain[] = [body(fieldName).isString().withMessage(`'${fieldName}' must be a string`)];

    if (options?.min) {
      chain.push(body(fieldName).isLength({ min: options.min }).withMessage(`'${fieldName}' must have at least ${options.min} characters`));
    }

    if (options?.max) {
      chain.push(body(fieldName).isLength({ max: options.max }).withMessage(`'${fieldName}' must have less than ${options.max} characters`));
    }

    return chain;
  }
}

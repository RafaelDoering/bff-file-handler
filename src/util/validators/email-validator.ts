import { body, ValidationChain } from 'express-validator';

import Validator from './validator';

export default class EmailValidator implements Validator {
  public body(fieldName: string): ValidationChain[] {
    return [body(fieldName).isEmail().withMessage(`'${fieldName}' must be an email`)];
  }
}

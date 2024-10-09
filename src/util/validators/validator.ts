import { ValidationChain } from "express-validator";

export default interface Validator {
  body(fieldName: string): ValidationChain[];
};

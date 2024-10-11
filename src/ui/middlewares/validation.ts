import { ContextRunner } from 'express-validator';

import { Request, Response, Next, StatusCode } from '../http-client';

const validate = (validations: ContextRunner[]) => {
  return async (req: Request, res: Response, next: Next) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        res.status(StatusCode.BAD_REQUEST).json({ errors: result.array() });
        return;
      }
    }

    next();
  };
};

export default validate;

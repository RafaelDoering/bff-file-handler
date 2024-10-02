import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerFile from '../../../scripts/swagger-output.json';

const router = Router();

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile));

export default router;

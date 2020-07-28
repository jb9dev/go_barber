import { Router } from 'express';

import ensureAuthenicated from '@modules/users/infra/http/middlewares/ensureAuthenicated';
import ListProvidersController from '../controllers/ListProvidersController';

const providersRouter = Router();
const listProviders = new ListProvidersController();

providersRouter.use(ensureAuthenicated);

providersRouter.get('/', listProviders.index);

export default providersRouter;

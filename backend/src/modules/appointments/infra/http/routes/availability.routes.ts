import { Router } from 'express';

import ensureAuthenicated from '@modules/users/infra/http/middlewares/ensureAuthenicated';

import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const availabilityRouter = Router();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

availabilityRouter.use(ensureAuthenicated);

availabilityRouter.post(
  '/:provider_id/day',
  providerDayAvailabilityController.index,
);
availabilityRouter.post(
  '/:provider_id/month',
  providerMonthAvailabilityController.index,
);

export default availabilityRouter;

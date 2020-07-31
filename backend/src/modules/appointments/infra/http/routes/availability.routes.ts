import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenicated from '@modules/users/infra/http/middlewares/ensureAuthenicated';

import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const availabilityRouter = Router();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

availabilityRouter.use(ensureAuthenicated);

availabilityRouter.post(
  '/:provider_id/day',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerDayAvailabilityController.index,
);
availabilityRouter.post(
  '/:provider_id/month',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvailabilityController.index,
);

export default availabilityRouter;

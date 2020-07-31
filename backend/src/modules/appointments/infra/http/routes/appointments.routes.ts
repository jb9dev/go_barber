import { Router } from 'express';

import ensureAuthenicated from '@modules/users/infra/http/middlewares/ensureAuthenicated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenicated);

appointmentsRouter.post('/', appointmentsController.create);
appointmentsRouter.post('/me', providerAppointmentsController.index);

export default appointmentsRouter;

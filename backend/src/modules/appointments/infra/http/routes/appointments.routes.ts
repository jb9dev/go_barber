import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenicated from '@modules/users/infra/http/middlewares/ensureAuthenicated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenicated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const { date } = request.body;
  const parsedDate = parseISO(date);
  const createAppointment = container.resolve(CreateAppointmentService);
  const appointment = await createAppointment.execute({
    provider_id: request.user.id,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;

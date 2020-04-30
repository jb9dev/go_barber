import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointments = new AppointmentsRepository;

appointmentsRouter.get('/', (request, response) => {
  const foundAppointments = appointments.all();

  return response.json(foundAppointments);
})

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;
  const parsedDate = startOfHour(parseISO(date));
  const appointmentInSameDate = appointments.findByDate(parsedDate);

  if (appointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = appointments.create(provider, parsedDate);

  return response.json(appointment);
});

export default appointmentsRouter;

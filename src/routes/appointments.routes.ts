import { Router, request, response } from 'express';
import { uuid } from 'uuidv4';

const appointmentRouter = Router();

const appointments = [];

// eslint-disable-next-line no-shadow
appointmentRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const appointment = {
    id: uuid(),
    provider,
    date,
  };

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentRouter;

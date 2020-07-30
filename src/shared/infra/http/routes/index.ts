import { Router } from 'express';

import appointmentRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

const routes = Router();
routes.use('/appointments', appointmentRouter);
routes.use('/users', usersRouter);

export default routes;

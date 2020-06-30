import { Router } from 'express';

import appointmentRouter from './appointments.routes';

const routes = Router();
routes.use(appointmentRouter);

export default routes;

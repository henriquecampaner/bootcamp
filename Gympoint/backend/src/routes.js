import { Router } from 'express';

import StudentController from './app/controllers/studentController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.use(authMiddleware);

routes.post('/students', StudentController.store);
routes.put('/students/update/:id', StudentController.update);
routes.delete('/students/update/:id', StudentController.delete);

export default routes;

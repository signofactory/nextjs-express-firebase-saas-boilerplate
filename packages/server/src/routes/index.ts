// Router
import { Router } from 'express';

//Requires API routes
import userRouter from './user';

const routes = Router();

routes.use('/user', userRouter);

export default routes;

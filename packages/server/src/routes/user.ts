//Express
import { Request, Response, Router } from 'express';
const userRouter = Router();

//Middleware
import requireLogin from '@src/middlewares/requireLogin';

//Roles

//Controller functions

//Routes
userRouter.get(
  '/current',
  requireLogin,
  async (req: Request, res: Response) => {
    res
      .status(200)
      .send({ message: 'User retrieved successfully', user: req.user });
  }
); // Search users

export default userRouter;

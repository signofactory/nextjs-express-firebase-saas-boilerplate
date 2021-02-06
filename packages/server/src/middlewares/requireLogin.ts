import { firebaseAdmin } from '@src/utils/auth/firebaseAdmin';

// Utils
import { getOrRegisterUser } from '@controllers/userController';

// Types
import { NextFunction, Request, Response } from 'express';

const requireLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headerToken = req.headers.authorization;
  if (!headerToken) {
    res.status(401).send({ error: 'No token provided' });
    return;
  }

  if (headerToken && headerToken.split(' ')[0] !== 'Bearer') {
    res.status(401).send({ error: 'Invalid token' });
    return;
  }

  const token = headerToken?.split(' ')[1];

  try {
    const userFromToken = await firebaseAdmin
      .auth()
      .verifyIdToken(token ? token : '');
    const user = await getOrRegisterUser(userFromToken);

    if (user) req.user = user;
    next();
  } catch (error) {
    res.status(403).send({ error: error.message });
    return;
  }
};

export default requireLogin;

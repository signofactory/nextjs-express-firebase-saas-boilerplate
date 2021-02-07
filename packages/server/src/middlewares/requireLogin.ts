// Firebase Admin
import { firebaseAdmin } from '@src/utils/auth/firebaseAdmin';

// Utils
import { getOrRegisterUser } from '@controllers/userController';
import { refreshExpiredIdToken } from '@src/utils/auth/refreshExpiredToken';

// Types
import { NextFunction, Request, Response } from 'express';

// Refreshes the token if it's expired and returns the firebase admin element
const verifyOrRefreshIdToken = async (
  idToken: string,
  refreshToken: string
): Promise<any> => {
  try {
    return {
      ...(await firebaseAdmin.auth().verifyIdToken(idToken, true)),
    };
  } catch {
    const token = await refreshExpiredIdToken(refreshToken);

    console.log(token);

    return {
      ...(await firebaseAdmin.auth().verifyIdToken(token, true)),
    };
  }
};

// Actual middleware
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

  const idToken = headerToken?.split(' ')[1] || '';
  const refreshToken = (req.headers.refreshtoken as string) || '';

  try {
    const userFromToken = await verifyOrRefreshIdToken(idToken, refreshToken);
    const user = await getOrRegisterUser(userFromToken);

    if (user) req.user = user;
    next();
  } catch (error) {
    res.status(403).send({ error: error.message });
    return;
  }
};

export default requireLogin;

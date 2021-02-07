import 'reflect-metadata';
import 'dotenv-safe/config';
import { __prod__, COOKIE_NAME } from '@src/config/constants';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';

// Type ORM
import { initConnection } from '@src/utils/initConnection';

// Configurations

// Routes
import routes from './routes';

// Main function to configure and start server
const main = async () => {
  // 0. CONFIGURE EXTRA STUFF

  // 1. CONNECTS TO DB AND DECLARES APP
  await initConnection();

  const app = express();

  // const RedisStore = connectRedis(session);
  // const redis = new Redis(process.env.REDIS_URL);
  // 2. EXPRESS CONFIGS
  app.use(
    bodyParser.json({
      limit: '5mb',
    })
  );
  app.use(
    bodyParser.urlencoded({
      limit: '5mb',
      parameterLimit: 100000,
      extended: true,
    })
  );
  app.set('trust proxy', 1);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );
  app.use(
    session({
      name: COOKIE_NAME,
      // store: new RedisStore({
      //   client: redis,
      //   disableTouch: true,
      // }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 1, // 1 year
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: __prod__, // cookie only works in https when deployed in prod
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET || 'abigsecret',
      resave: false,
    })
  );

  // 3. EXPRESS ROUTES
  app.get('/', async (_req: Request, res: Response) => {
    res.status(200).send({ message: 'SaaS backend running' });
  });
  app.use('/v1', routes);

  // 4. LAUNCH EXPRESS APP
  const port = parseInt(process.env.PORT || '5000');

  app.listen(port, () => {
    console.log(`SaaS server started on port ${port}`);
  });
};

main()
  .then(async () => {
    // 5. POST LAUNCH FUNCTIONS
  })
  .catch((err) => {
    console.error(err);
  });

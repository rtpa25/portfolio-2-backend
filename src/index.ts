/** @format */

//Dependencies
import 'dotenv/config';
import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

//Internal Imports
import connect from './config/db';
import logger from './utils/logger';

//Routes import statements
import Cell from './routes/cell.route';
import User from './routes/user.route';

const app: Express = express();

//regular middleware
app.use(cookieParser());
app.use(express.json({ limit: '50MB' }));
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://portfolio-2-frontend.vercel.app',
    ],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));

//router middleware
app.use('/api/v1', Cell);
app.use('/api/v1', User);

app.listen(process.env.PORT || 5000, async () => {
  logger.info(`listening to port ${process.env.PORT}`);
  await connect();
});

/** @format */

//Dependencies
import 'dotenv/config';
import express, { Express } from 'express';
import cors from 'cors';

//Internal Imports
import connect from './config/db';
import logger from './utils/logger';

//Routes import statements
import Cell from './routes/cell.route';
import User from './routes/user.route';

const app: Express = express();

//regular middleware
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000'],
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

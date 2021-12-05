/** @format */

//Dependencies
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { auth } from 'express-openid-connect';

//Internal Updates
import connect from './config/db';
import logger from './utils/logger';

const app = express();

//regular middleware
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.listen(process.env.PORT || 5000, async () => {
  logger.info(`listening to port ${process.env.PORT}`);
  await connect();
});

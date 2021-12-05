/** @format */

//Dependencies
import express, { Router } from 'express';
import { fetchCells } from '../controllers/cell.controller';
import { isLoggedIn } from '../middlewares/user.middleware';

//create a router instance
const router: Router = express.Router();

/*   /api/v1/fetchCells   */
router.route('/fetchCells').get(isLoggedIn as any, fetchCells as any);

export default router;

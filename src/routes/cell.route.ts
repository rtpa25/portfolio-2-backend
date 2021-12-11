/** @format */

//Dependencies
import express, { Router } from 'express';
import {
  fetchCells,
  addCell,
  updateCell,
  deleteCell,
} from '../controllers/cell.controller';
import { isLoggedIn } from '../middlewares/user.middleware';

//create a router instance
const router: Router = express.Router();

/*   /api/v1/fetchCells   */
router.route('/fetchCells').get(isLoggedIn as any, fetchCells as any);

/*   /api/v1/addCell   */
router.route('/addCell').post(isLoggedIn as any, addCell as any);

/*   /api/v1/updateCell/:cellId   */
router.route('/updateCell/:cellId').put(isLoggedIn as any, updateCell as any);

/*   /api/v1/deleteCell/:cellId   */
router
  .route('/deleteCell/:cellId')
  .delete(isLoggedIn as any, deleteCell as any);

export default router;

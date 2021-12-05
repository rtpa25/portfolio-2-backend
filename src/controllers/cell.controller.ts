/** @format */

//DEPENDENCIES
import { Response, NextFunction } from 'express';

//INTERNAL IMPORTS
import logger from '../utils/logger';
import Cell from '../models/cell.model';
import { CustomReq } from '../utils/UserCustomRequestObject';

export const fetchCells = async (
  req: CustomReq,
  res: Response,
  next: NextFunction
) => {
  try {
    //get the cells of a certain user with his id
    const { userId } = req.user._id;
    const Cells = await Cell.find({ user: userId });

    //send response of the cells
    res.status(200).json({
      success: true,
      Cells: Cells,
    });
  } catch (error: any) {
    //this case is our internal fault
    res.status(500).json({
      success: false,
      message: 'Internal erros',
    });
    logger.error(error.message);
  }
};

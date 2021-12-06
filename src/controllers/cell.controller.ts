/** @format */

//DEPENDENCIES
import { Response, NextFunction } from 'express';

//INTERNAL IMPORTS
import logger from '../utils/logger';
import Cell, { CellDocument } from '../models/cell.model';
import { CustomReq } from '../utils/UserCustomRequestObject';

//-----FETCHCELLS CONTROLLER ----//
export const fetchCells = async (
  req: CustomReq,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      res.status(400).json({
        success: false,
        message: 'Only Authenticated users allowed',
      });
    }
    //get the cells of a certain user with his id
    const userId = req.user._id;

    const Cells = await Cell.find({ user: userId }).sort({ createdAt: 1 });

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

//-----ADDCELL CONTROLLER ----//
export const addCell = async (
  req: CustomReq,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      res.status(400).json({
        success: false,
        message: 'Only Authenticated users allowed',
      });
    }
    console.log(req);

    req.body.user = req.user._id;

    console.log(req.body);

    await Cell.create(req.body);

    //send response of the cells
    res.status(200).json({
      success: true,
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

//-----UPDATECELL CONTROLLER ----//
export const updateCell = async (
  req: CustomReq,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      res.status(400).json({
        success: false,
        message: 'Only Authenticated users allowed',
      });
    }

    const { cellId } = req.params;
    const { content } = req.body;

    const cell = await Cell.findOneAndUpdate(
      {
        id: cellId,
      },
      {
        content: content,
      },
      { new: true }
    );

    //send response of the cells
    res.status(200).json({
      success: true,
      cell,
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

//-----DELETECELL CONTROLLER ----//
export const deleteCell = async (
  req: CustomReq,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      res.status(400).json({
        success: false,
        message: 'Only Authenticated users allowed',
      });
    }

    const { cellId } = req.params;

    await Cell.findByIdAndRemove(cellId);

    //send response of the cells
    res.status(200).json({
      success: true,
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

/** @format */
/** @format */
//Dependencies
import { Response, Request, NextFunction } from 'express';

//internal imports
import User from '../models/user.model';
import { cookieToken } from '../utils/cookieToken';
import logger from '../utils/logger';
import { CustomReq } from '../utils/UserCustomRequestObject';

//-----SIGNUP CONTROLLER ----//
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //grab all the info from req.body after the edge cases
    const { username, email, password } = req.body;

    //check if the required fields are absent
    if (!(email || username || password)) {
      //returns an error message
      return res.status(400).json({
        success: false,
        message: 'Email, Password and UserName are required',
      });
    }

    //create an instance of the user object and store it in the collection
    const user = await User.create({
      username,
      email,
      password,
    });
    //this utility function creates a JWT token and return the response
    cookieToken(user, res);
  } catch (error: any) {
    logger.error(error);
    //send error message
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
  next();
};

//-----LOGIN CONTROLLER ----//
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //get the email and password from the request body
    const { email, password } = req.body;
    //check if email and password are present
    if (!(email || password)) {
      res.status(400).json({
        success: false,
        message: 'Email and password is required',
      });
    }
    //check if the email and hence the user is in the db
    const user = await User.findOne({ email: email }).select('+password');

    //user not in db
    if (!user) {
      res.status(400).json({
        success: false,
        message: 'User in not registered',
      });
    }
    //take the password and validate if it is same with the one in db
    const isPasswordCorrect = await user?.isValidPassword(password);

    //password sent by the user is not correct
    if (!isPasswordCorrect) {
      res.status(400).json({
        success: false,
        message: 'Password is wrong',
      });
    }
    //if password mathces then give him a cookie token
    cookieToken(user!, res);
  } catch (error: any) {
    logger.error(error);
    //send error message
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
  next();
};

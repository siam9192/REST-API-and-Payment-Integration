import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import httpStatus from '../utils/http-status';
import AppError from '../errors/AppError';
import jwtHelper from '../helpers/jwt.helper';
import envConfig from '../config/env.config';
import { JwtPayload } from 'jsonwebtoken';
import { UserModel } from '../modules/user/user.model';
import { AuthUser } from '../modules/auth/auth.interface';

function auth() {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token1 = req.cookies?.accessToken?.replace('Bearer ', '');
    const token2 = req.headers.authorization?.replace('Bearer ', '');

    const token = token1 || token2;
    console.log(token);
    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // checking if the given token is valid
    let decoded;

    try {
      decoded = jwtHelper.verifyToken(
        token,
        envConfig.jwt.access_token_secret as string,
      ) as AuthUser & JwtPayload & { id: string };
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
    }

    // checking if the user is exist
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    req.user = {
      id: user._id.toString(),
    };

    next();
  });
}

export default auth;

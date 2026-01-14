import envConfig from '../../config/env.config';
import catchAsync from '../../utils/catchAsync';
import httpStatus from '../../utils/http-status';
import { sendSuccessResponse } from '../../utils/response';
import authService from './auth.service';
import parse from 'parse-duration';

class AuthController {
  login = catchAsync(async (req, res) => {
    const result = await authService.login(req.body);
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: envConfig.environment?.toLocaleLowerCase() === 'production',
      sameSite:
        envConfig.environment?.toLowerCase() === 'production' ? 'none' : 'lax',
      maxAge: parse(envConfig.jwt.access_token_expire as string) as number,
    });

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: envConfig.environment?.toLocaleLowerCase() === 'production',
      sameSite:
        envConfig.environment?.toLowerCase() === 'production' ? 'none' : 'lax',
      maxAge: parse(envConfig.jwt.refresh_token_expire as string) as number,
    });

    sendSuccessResponse(res, {
      message: 'Login successful',
      statusCode: httpStatus.OK,
      data: result,
    });
  });

  register = catchAsync(async (req, res) => {
    const result = await authService.register(req.body);

    sendSuccessResponse(res, {
      message: 'Registration successful',
      statusCode: httpStatus.CREATED,
      data: result,
    });
  });

}

export default new AuthController();

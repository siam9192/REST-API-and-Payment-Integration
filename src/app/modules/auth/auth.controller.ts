import envConfig from '../../config/env.config';
import { parseDurationMs } from '../../helpers/utils.helper';
import catchAsync from '../../utils/catchAsync';
import httpStatus from '../../utils/http-status';
import { sendSuccessResponse } from '../../utils/response';
import authService from './auth.service';


class AuthController {
  login = catchAsync(async (req, res) => {
    const result = await authService.login(req.body);
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: envConfig.environment?.toLocaleLowerCase() === 'production',
      sameSite:
        envConfig.environment?.toLowerCase() === 'production' ? 'none' : 'lax',
      maxAge: parseDurationMs(envConfig.jwt.access_token_expire as string) as number,
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

import catchAsync from '../../utils/catchAsync';
import httpStatus from '../../utils/http-status';
import { sendSuccessResponse } from '../../utils/response';
import userService from './user.service';

class UserController {
  getCurrentUser = catchAsync(async (req, res) => {
    const result = await userService.getCurrentUser(req.user);
    sendSuccessResponse(res, {
      message: 'Current user retrieved successfully',
      statusCode: httpStatus.OK,
      data: result,
    });
  });
}

export default new UserController();

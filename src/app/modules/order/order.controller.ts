import { paginationOptionPicker } from '../../helpers/pagination.helper';
import catchAsync from '../../utils/catchAsync';
import httpStatus from '../../utils/http-status';
import { sendSuccessResponse } from '../../utils/response';
import orderService from './order.service';

class OrderController {
  initOrder = catchAsync(async (req, res) => {
    console.log(req.body);
    const result = await orderService.initOrder(req.user, req.body);
    sendSuccessResponse(res, {
      message: 'Order initialized successfully',
      statusCode: httpStatus.CREATED,
      data: result,
    });
  });
  getCurrentUserOrders = catchAsync(async (req, res) => {
    const result = await orderService.getCurrentUserOrders(
      req.user,
      paginationOptionPicker(req.query),
    );
    sendSuccessResponse(res, {
      message: 'Orders retrieved successfully',
      statusCode: httpStatus.OK,
      ...result,
    });
  });

  getOrders = catchAsync(async (req, res) => {
    const result = await orderService.getOrders(
      paginationOptionPicker(req.query),
    );
    sendSuccessResponse(res, {
      message: 'Orders retrieved successfully',
      statusCode: httpStatus.OK,
      ...result,
    });
  });
}

export default new OrderController();

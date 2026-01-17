import { paginationOptionPicker } from '../../helpers/pagination.helper';
import catchAsync from '../../utils/catchAsync';
import httpStatus from '../../utils/http-status';
import { sendSuccessResponse } from '../../utils/response';
import paymentService from './payment.service';

class PaymentController {
  getPayments = catchAsync(async (req, res) => {
    const result = await paymentService.getPayments(
      paginationOptionPicker(req.query),
    );
    sendSuccessResponse(res, {
      message: 'Payments retrieved successfully',
      statusCode: httpStatus.OK,
      ...result,
    });
  });
  webhook = catchAsync(async (req, res) => {
    const result = await paymentService.webhook(req.body, req.headers);
  });
}

export default new PaymentController();

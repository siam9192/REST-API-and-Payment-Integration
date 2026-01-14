import { paginationOptionPicker } from '../../helpers/pagination.helper';
import catchAsync from '../../utils/catchAsync';
import httpStatus from '../../utils/http-status';
import { sendSuccessResponse } from '../../utils/response';
import productService from './product.service';

class ProductController {
  createProduct = catchAsync(async (req, res) => {
    const result = await productService.createProduct(req.body);
    sendSuccessResponse(res, {
      message: 'Product created successfully',
      statusCode: httpStatus.CREATED,
      data: result,
    });
  });

  getProductById = catchAsync(async (req, res) => {
    const result = await productService.getProductById(req.params.id);
    sendSuccessResponse(res, {
      message: 'Product retrieved successfully',
      statusCode: httpStatus.OK,
      data: result,
    });
  });

  getProducts = catchAsync(async (req, res) => {
    const result = await productService.getProducts(
      paginationOptionPicker(req.query),
    );
    sendSuccessResponse(res, {
      message: 'Products retrieved successfully',
      statusCode: httpStatus.OK,
      ...result,
    });
  });
}

export default new ProductController();

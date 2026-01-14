import AppError from '../../errors/AppError';
import { calculatePagination } from '../../helpers/pagination.helper';
import { PaginationOptions } from '../../types';
import httpStatus from '../../utils/http-status';
import { CreateProductPayload } from './product.interface';
import { ProductModel } from './product.model';
import productValidations from './product.validation';

class ProductService {
  async createProduct(payload: CreateProductPayload) {
    payload = productValidations.createProductSchema.parse(payload);
    return await ProductModel.create(payload);
  }

  async getProductById(id: string) {
    const product = await ProductModel.findById(id).lean();

    // Check product existence
    if (!product) throw new AppError(httpStatus.NOT_FOUND, 'Product not found');

    return product;
  }

  async getProducts(paginationOptions: PaginationOptions) {
    // Calculate pagination and sorting related data
    const { page, limit, skip, sortBy, sortOrder } =
      calculatePagination(paginationOptions);

    // Fetch products
    const products = await ProductModel.find()
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder });

    // Count total products
    const total = await ProductModel.countDocuments();

    const meta = {
      page,
      limit,
      total,
    };

    // Return result
    return {
      data: products,
      meta,
    };
  }
}

export default new ProductService();

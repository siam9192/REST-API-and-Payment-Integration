import AppError from '../../errors/AppError';
import httpStatus from '../../utils/http-status';
import { AuthUser } from '../auth/auth.interface';

import bcryptHelper from '../../helpers/bycrypt.helper';
import { CreateUserPayload } from './user.interface';
import { UserModel } from './user.model';
import userValidations from './user.validation';
import { PaginationOptions } from '../../types';
import { calculatePagination } from '../../helpers/pagination.helper';

class UserService {
  async getCurrentUser(authUser: AuthUser) {
    console.log(authUser);
    const user = await UserModel.findById(authUser.id).lean();
    // Check user existence
    if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

    return user;
  }
  async createUser(payload: CreateUserPayload) {
    payload = userValidations.createUserSchema.parse(payload);
    const user = await UserModel.findOne({ email: payload.email });

    // Check user existence
    if (user)
      throw new AppError(
        httpStatus.FORBIDDEN,
        'User is already exists using this email',
      );

    const encrypted_password = bcryptHelper.hash(payload.password);

    return await UserModel.create({
      ...payload,
      password: encrypted_password,
    });
  }

  async getUsers(paginationOptions: PaginationOptions) {
    // Calculate pagination and sorting related data
    const { page, limit, skip, sortBy, sortOrder } =
      calculatePagination(paginationOptions);

    // Fetch products
    const products = await UserModel.find()
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder });

    // Count total products
    const total = await UserModel.countDocuments();

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

export default new UserService();

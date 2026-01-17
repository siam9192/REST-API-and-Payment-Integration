import envConfig from '../../config/env.config';
import jwtHelper from '../../helpers/jwt.helper';
import AppError from '../../errors/AppError';
import httpStatus from '../../utils/http-status';
import bcryptHelper from '../../helpers/bycrypt.helper';
import { UserModel } from '../user/user.model';
import authValidations from './auth.validation';
import { LoginPayload, RegisterPayload } from './auth.interface';
import userService from '../user/user.service';

class AuthService {
  async login(payload: LoginPayload) {
    //  Validate payload  throw error when invalid
    payload = authValidations.loginSchema.parse(payload);

    const { email, password } = payload;

    const user = await UserModel.findOne({
      email,
    }).select('password profileId');

    if (!user) throw new AppError(httpStatus.NOT_FOUND, 'Account not found');

    // Compare password
    const isPasswordValid =
      user && (await bcryptHelper.compare(password, user.password));

    if (!user || !isPasswordValid) {
      throw new AppError(httpStatus.FORBIDDEN, 'Invalid email or password');
    }

    const tokenPayload = { id: user._id.toString() };

    // Generate access token
    const accessToken = jwtHelper.generateToken(
      tokenPayload,
      envConfig.jwt.access_token_secret as string,
      envConfig.jwt.access_token_expire as string,
    );
    

    return { accessToken};
  }

  async register(payload: RegisterPayload) {
    // Create user
    return await userService.createUser(payload);
  }
}

export default new AuthService();

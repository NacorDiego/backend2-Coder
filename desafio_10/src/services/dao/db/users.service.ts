import User from '@models/user.model';
import { LoginData, RegisterData } from '@interfaces/sessions.interface';

export const userRegisterService = async (registerData: RegisterData) => {
  try {
    const userExists = await User.findOne({ email: registerData.email });
    if (userExists)
      throw { status: 409, message: 'El usuario ya se encuentra registrado.' };

    const newUser = new User(registerData);
    // newUser.password = await User.encryptPassword(registerData.password);

    const result = await newUser.save();
    return result;
  } catch (error: any) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

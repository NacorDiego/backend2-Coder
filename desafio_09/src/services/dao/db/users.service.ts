import User from '@models/user.model';
import { LoginData, RegisterData } from '@interfaces/sessions.interface';

export const userRegisterService = async (registerData: RegisterData) => {
  try {
    const userExists = await User.findOne({ email: registerData.email });
    if (userExists)
      throw { status: 409, message: 'El usuario ya se encuentra registrado.' };

    //TODO:Encriptar constraseña
    // registerData.password = await User.encryptPassword(password);

    const result = await User.create(registerData);
    return result;
  } catch (error: any) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

export const userLoginService = async (loginData: LoginData) => {
  try {
    const user = await User.findOne({
      email: loginData.email,
      password: loginData.password,
    });
    if (!user)
      throw { status: 401, message: 'Email o contraseña incorrectos.' };

    return {
      id: user._id,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
    };
  } catch (error: any) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

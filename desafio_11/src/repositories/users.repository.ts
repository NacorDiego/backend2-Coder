// Daos
import * as UserDao from '@daos/users.dao';

// Errors
import {
  ConflictError,
  NotFoundError,
  ValidationError,
} from '@utils/errors.util';

// Models
import UserModel from '@models/user.model';

export const registerUser = async (
  registerData: Partial<InstanceType<typeof UserModel>>,
): Promise<InstanceType<typeof UserModel> | null> => {
  // Validations
  if (!registerData.email || !registerData.password)
    throw new ValidationError('El email y la contraseña son requeridos.');

  const userExists = await UserDao.findUserByEmail(registerData.email);
  if (userExists)
    throw new ConflictError('El usuario ya se encuentra registrado.');

  return await UserDao.saveUser(registerData);
};

export const updateUserPassword = async (
  email: string,
  password: string,
  confirm_password: string,
): Promise<InstanceType<typeof UserModel> | null> => {
  // Validations
  if (password !== confirm_password)
    throw new ValidationError('Las contraseñas no coinciden.');

  if (password.length < 4)
    throw new ValidationError(
      'Las contraseñas deben tener al menos 4 caracteres.',
    );

  const hashedPassword = await UserModel.encryptPassword(password);

  const updatedUser = await UserDao.updateUserPassword(email, hashedPassword);

  if (!updatedUser)
    throw new NotFoundError('No se pudo actualizar la contraseña del usuario.');

  return updatedUser;
};

export const updateUserEmailAndPassword = async (
  githubId: string,
  email: string,
  password: string,
  confirm_password: string,
): Promise<InstanceType<typeof UserModel> | null> => {
  // Validations
  if (password !== confirm_password)
    throw new ValidationError('Las contraseñas ingresadas no coinciden.');
  if (password.length < 4)
    throw new ValidationError(
      'Las contraseñas deben tener al menos 4 caracteres.',
    );
  const hashedPassword = await UserModel.encryptPassword(password);

  const updatedUser = await UserDao.updateUserByEmailAndPassword(
    githubId,
    email,
    hashedPassword,
  );
  if (!updatedUser)
    throw new NotFoundError('No se pudo actualizar el email del usuario.');

  return updatedUser;
};

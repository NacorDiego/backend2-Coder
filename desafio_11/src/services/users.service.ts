// Models
import UserModel from '@models/user.model';

// Repositories
import * as UserRepository from '@repositories/users.repository';

export const userRegisterService = async (
  registerData: Partial<InstanceType<typeof UserModel>>,
) => {
  return await UserRepository.registerUser(registerData);
};

export const updateUserEmailAndPassword = async (
  githubId: string,
  email: string,
  password: string,
  confirm_password: string,
): Promise<InstanceType<typeof UserModel> | null> => {
  return await UserRepository.updateUserEmailAndPassword(
    githubId,
    email,
    password,
    confirm_password,
  );
};

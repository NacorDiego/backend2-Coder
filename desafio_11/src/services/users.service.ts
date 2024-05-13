// Models
import { IUserGithub } from '@interfaces/users.interface';
import UserModel from '@models/user.model';

// Repositories
import * as UserRepository from '@repositories/users.repository';

export const checkPassword = async (
  password: string,
  userPassword: string,
): Promise<boolean> => {
  return await UserRepository.checkPassword(password, userPassword);
};

export const createUserFromGithub = async (
  newUser: IUserGithub,
): Promise<InstanceType<typeof UserModel> | null> => {
  return await UserRepository.createUserFromGithub(newUser);
};

export const findUserByEmail = async (
  email: string,
): Promise<InstanceType<typeof UserModel> | null> => {
  return await UserRepository.findUserByEmail(email);
};

export const findUserByGithubId = async (
  githubId: string,
): Promise<InstanceType<typeof UserModel> | null> => {
  return await UserRepository.findUserByGithubId(githubId);
};

export const userRegisterService = async (
  registerData: Partial<InstanceType<typeof UserModel>>,
) => {
  return await UserRepository.registerUser(registerData);
};

export const updateUserPassword = async (
  email: string,
  password: string,
  confirm_password: string,
): Promise<InstanceType<typeof UserModel> | null> => {
  return await UserRepository.updateUserPassword(
    email,
    password,
    confirm_password,
  );
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

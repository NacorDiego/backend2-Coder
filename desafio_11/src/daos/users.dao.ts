import { IUserGithub } from '@interfaces/users.interface';
import UserModel from '@models/user.model';

export const checkPassword = async (
  password: string,
  userPassword: string,
): Promise<boolean> => {
  return await UserModel.matchPassword(password, userPassword);
};

export const createUserFromGithub = async (
  newUser: IUserGithub,
): Promise<InstanceType<typeof UserModel> | null> => {
  return await UserModel.create(newUser);
};

export const findUserByEmail = async (
  email: string,
): Promise<InstanceType<typeof UserModel> | null> => {
  return await UserModel.findOne({ email });
};

export const findUserByGithubId = async (
  githubId: string,
): Promise<InstanceType<typeof UserModel> | null> => {
  return await UserModel.findOne({ githubId });
};

export const saveUser = async (
  userData: Partial<InstanceType<typeof UserModel>>,
): Promise<InstanceType<typeof UserModel> | null> => {
  const newUser = new UserModel(userData);

  return await newUser.save();
};

export const updateUserPassword = async (
  email: string,
  hashedPassword: string,
): Promise<InstanceType<typeof UserModel> | null> => {
  return await UserModel.findOneAndUpdate(
    { email },
    { password: hashedPassword },
    { new: true },
  );
};

export const updateUserByEmailAndPassword = async (
  githubId: string,
  email: string,
  hashedPassword: string,
): Promise<InstanceType<typeof UserModel> | null> => {
  return await UserModel.findOneAndUpdate(
    { githubId },
    { email, password: hashedPassword },
    { new: true },
  );
};

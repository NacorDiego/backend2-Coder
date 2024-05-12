import UserModel from '@models/user.model';

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

export const saveUser = async (
  userData: Partial<InstanceType<typeof UserModel>>,
): Promise<InstanceType<typeof UserModel> | null> => {
  const newUser = new UserModel(userData);

  return await newUser.save();
};

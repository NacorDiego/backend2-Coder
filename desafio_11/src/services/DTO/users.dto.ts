import { IUserGithub, UserToRegister } from '@interfaces/users.interface';
import { Schema } from 'mongoose';

export default class UsersDto {
  id!: Schema.Types.ObjectId;
  first_name?: string;
  last_name?: string;
  name?: string;
  email: string;
  age: number;
  role: string;
  password?: string;
  loggedBy?: string;
  githubId?: number;

  constructor() {
    this.email = '';
    this.age = 18;
    this.role = 'user';
    this.githubId = 0;
  }

  public fromDatabaseToJwt(user: UserToRegister): UsersDto {
    this.id = user._id;
    this.name = `${user.first_name} ${user.last_name}`;
    this.email = user.email;
    if (user.githubId !== 0) this.githubId = user.githubId;
    return this;
  }

  public fromGithubToDatabase(user: IUserGithub): UsersDto {
    this.first_name = user.username || '';
    this.last_name = '';
    this.email = user.email || '';
    this.password = '';
    this.loggedBy = 'GitHub';
    this.githubId = user.githubId;
    return this;
  }

  // public fromFormToDatabase(user: IUserGithub): UsersDto {
  //   this.first_name = user.first_name;
  //   this.last_name = '';
  //   this.email = user.email || '';
  //   this.password = '';
  //   this.loggedBy = 'GitHub';
  //   this.githubId = user.githubId;
  //   return this;
  // }
}

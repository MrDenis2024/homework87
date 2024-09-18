import {Model, ObjectId} from 'mongoose';

export interface UserFields {
  username: string;
  password: string;
  token: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;

export interface PostFields {
  user: ObjectId;
  title: string;
  description: string | null;
  image: string | null;
  datetime: Date;
}
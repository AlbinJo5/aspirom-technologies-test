export interface ICreateUser {
  name: string;
  email: string;
}

export interface IUpdateUser {
  name?: string;
  email?: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
}

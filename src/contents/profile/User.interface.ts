interface IUser {
  id?: Number;
  firstname?: string;
  lastName?: string;
  gender?: string;
  nic?: string;
  address?: string;
  mobileNumber?: string;
  email?: string;
  userStatus: string;
  userType: string | number;
}


interface IPasswordChange {}

export type { IUser };

export interface ISignUp {
  username: string;
  email: string;
  password: string;
  showroomName: string;
  showroomCity: string;
  showroomAddress: string;
  showroomState: string;
  showroomContactNo: string;
}

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: string;
  showroomId: any;
}

export interface IInvestor {
  investorName: string;
  cnic: string;
  phoneNo: string;
  capitalAmount?: number;
  profit?: number;
  showroomId: any;
}

export interface ISeller {
  category: string;
  name: String;
  phone_no: number;
  email: string;
  province: string;
  City: string;
  address: string;
  showroomId: any;
}

export interface Ilogin {
  username: string;
  password: string;
}

export interface IChangePassword {
    
  oldPassword: string;
  newPassword: string;
}

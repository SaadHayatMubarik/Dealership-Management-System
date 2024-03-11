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

<<<<<<< HEAD
export interface ISeller {
  category: string;
  name: String;
  phone_no: number;
  email: string;
  province: string;
  City: string;
  address: string;
  cnic?: string;
  showroomId: any;
=======
export interface ISeller{
    category:string;
    name: string;
    phoneNo: string;
    email:string;
    province:string;
    city:string;
    address:string;
    cnic: string;
    showroomId:any;
>>>>>>> 19e34e7fe71b01eca3c2c9f9ef2825fd526cf750
}

export interface Ilogin {
  username: string;
  password: string;
}

export interface IChangePassword {
    
  oldPassword: string;
  newPassword: string;
}

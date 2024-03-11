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

}

export interface Ilogin {
  username: string;
  password: string;
}

export interface IChangePassword {
    
  oldPassword: string;
  newPassword: string;
}

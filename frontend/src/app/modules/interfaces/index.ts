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


export interface IInvestor  {
  investorName: string;
  cnic: string;
  phoneNo: string;
  capitalAmount?: number;
  profit?: number;
  showroomId: any;
}


export interface ISeller{
    category:string;
    type: string;
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

export interface INotification 
{
  inventoryId:  number;
  showroomId : string | null;
  min_value : number;
  max_value : number;
  
}

export interface INotificationReceived {
  showroomName: string;
  vehicleId: string; 
  dateTime: Date;
}

export interface IEmployee {

  employeeName: string,
  employeeCnic: string,
  employeePosition: string,
  employeeStatus: string,
  employeePhoneNo: string,
  employeeEmail: string,
  employeeSalary: number,
  joiningDate: Date,
  terminationDate: Date,
  shiftTime: string,
  bonus: number,
  totalLeaves:number,
  availableLeaves:number,
  performance:string;
  showroomId: number;

}
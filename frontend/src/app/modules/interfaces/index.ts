export interface ISignUp{

    username: string;
    email: string;
    password: string;
    showroomName: string;
    showroomCity: string;
    showroomAddress: string;
    showroomState: string;
    showroomContactNo: string;
}

export interface IUser
{
username: string;
email:string;
password:string;
role:string;
showroomId: any;

}

export interface Ilogin{
    username:string;
    password:string;
    // rememberMe?: boolean;
}

export interface IChangePassword{
   
    oldPassword: string;
    newPassword: string;
}
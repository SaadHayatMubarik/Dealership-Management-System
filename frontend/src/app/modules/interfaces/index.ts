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
user_name: string;
email:string;
password:string;
role:string;
showroomid: any;

}

export interface Ilogin{
    username:string;
    password:string;
    // rememberMe?: boolean;
}
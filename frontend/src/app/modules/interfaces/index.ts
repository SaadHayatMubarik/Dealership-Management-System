export interface ISignUp{

    username: string;
    email: string;
    password: string;
    showroomName: string;
    showroomCity: string;
    showroomAddress: string;
    showroomState: string;
    showroomContactNo: number;
}

export interface Ilogin{
    username:string;
    password:string;
    rememberMe?: boolean;
}
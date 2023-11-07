export interface ISignUp{
    username: string;
    email: string;
    password: string;
    role: string;
}

export interface Ilogin{
    username:string;
    password:string;
    rememberMe?: boolean;
}
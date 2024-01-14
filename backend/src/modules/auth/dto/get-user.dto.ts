import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { UserRole } from "../user-role.enum";

export class GetUserDto {

    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    role:UserRole;
}
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { UserRole } from "../user-role.enum";

export class UpdateUserDto{
    
    @IsNumber()
    @IsNotEmpty()
    user_Id: number;

    @IsString()
    @IsOptional()
    @MinLength(4)
    @MaxLength(20)
    user_name?: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsOptional()
    role?: UserRole;
}
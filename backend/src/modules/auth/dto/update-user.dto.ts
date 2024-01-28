import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { UserRole } from "../user-role.enum";

export class UpdateUserDto{
    
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsOptional()
    @MinLength(4)
    @MaxLength(20)
    username?: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsOptional()
    role?: UserRole;
}
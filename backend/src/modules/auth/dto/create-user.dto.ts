import { IsNotEmpty,IsString, MinLength, MaxLength, IsEnum, Matches} from "class-validator";
import { UserRole } from "../user-role.enum";
// import { isString } from "util";
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
     { message: 'password is too weak' }) // atleast have one uppercase and one lowercase letter, atleast a number or special character
    password: string;

    // @IsEnum({type:"enum", enum: UserRole, default: UserRole.EMPLOYEE})
    role: UserRole;

    
}

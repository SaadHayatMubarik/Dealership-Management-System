import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class ValidateUserDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
     { message: 'password is too weak' })
    Password: string;


}

import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class GetUserDto {

    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    @IsString()
    username: string;


}
import { IsNotEmpty} from "class-validator";
import { UserRole } from "../user-role.enum";
export class CreateUserDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    role: UserRole;

    
}

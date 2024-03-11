import { IsNotEmpty } from "class-validator";

export class CreateCustomerDto{
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    phoneNo: string;

    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    province: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    cnic: string;
    
    @IsNotEmpty()
    showroomId: number;
}
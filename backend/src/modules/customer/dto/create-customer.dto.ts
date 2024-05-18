import { IsNotEmpty, IsOptional } from "class-validator";
import { CustomerType } from "../customer-type.enum";
import { CustomerCatagory } from "../customer-catagory.enum";

export class CreateCustomerDto{
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    category: CustomerCatagory;

    @IsNotEmpty()
    type: CustomerType;

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

    @IsOptional()
    cnic: string;
    
    @IsNotEmpty()
    showroomId: number;
}
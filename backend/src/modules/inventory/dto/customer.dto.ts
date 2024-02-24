import { IsNotEmpty, IsOptional } from "class-validator";
import { CustomerCatagory } from "src/modules/customer/customer-catagory.enum";

export class CustomerDto{
    @IsNotEmpty()
    customerCategory: CustomerCatagory;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    contactNo: string;

    @IsNotEmpty()
    customerEmail: string;

    @IsNotEmpty()
    province: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    address: string;

    @IsOptional()
    cnic: string;

}
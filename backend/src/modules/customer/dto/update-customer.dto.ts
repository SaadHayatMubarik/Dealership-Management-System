import { IsNotEmpty } from "class-validator";
import { CustomerCatagory } from "../customer-catagory.enum";
import { CustomerType } from "../customer-type.enum";

export class UpdateCustomerDto{
    @IsNotEmpty()
    customer_Id: number;

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

    @IsNotEmpty()
    cnic: string;

}
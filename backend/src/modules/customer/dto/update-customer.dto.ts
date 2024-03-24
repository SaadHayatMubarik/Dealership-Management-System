import { IsNotEmpty } from "class-validator";
import { CustomerCatagory } from "../customer-catagory.enum";
import { CustomerType } from "../customer-type.enum";

export class UpdateCustomerDto{
    @IsNotEmpty()
    customer_id: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    catagory: CustomerCatagory;

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
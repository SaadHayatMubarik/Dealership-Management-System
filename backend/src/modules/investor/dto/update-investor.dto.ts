import { IsNotEmpty } from "class-validator";
import { InvestorType } from "../investor-type.enum";

export class UpdateInvestorDto{
    @IsNotEmpty()
    customer_and_investor_id: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    cnic: string;

    @IsNotEmpty()
    phoneNo: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    province: string;

    @IsNotEmpty()
    investor_type: InvestorType;
}
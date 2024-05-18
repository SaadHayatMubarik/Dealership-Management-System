import { IsNotEmpty, IsOptional } from "class-validator";
import { InvestorType } from "../investor-type.enum";

export class InvestorDto{
    @IsNotEmpty()
    investorName: string;

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
    showroomId: number;

    @IsNotEmpty()
    investorType: InvestorType;
}
import { IsNotEmpty, IsOptional } from "class-validator";

export class InvestorDto{
    @IsNotEmpty()
    investorName: string;

    @IsNotEmpty()
    cnic: string;

    @IsNotEmpty()
    phoneNo: string;

    @IsOptional()
    capitalAmount: number;

    @IsOptional()
    profit: number;

    @IsNotEmpty()
    showroomId: number;
}
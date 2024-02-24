import { IsNotEmpty } from "class-validator";

export class InvestorDto{
    @IsNotEmpty()
    investorName: string;

    @IsNotEmpty()
    cnic: string;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    capitalAmount: number;

    @IsNotEmpty()
    profit: number;

    @IsNotEmpty()
    showroomId: number;
}
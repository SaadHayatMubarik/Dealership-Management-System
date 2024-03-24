import { IsNotEmpty } from "class-validator";

export class UpdateInvestorDto{
    @IsNotEmpty()
    investorId: number;

    @IsNotEmpty()
    investorName: string;

    @IsNotEmpty()
    investorCnic: string;

    @IsNotEmpty()
    phoneNo: string;
}
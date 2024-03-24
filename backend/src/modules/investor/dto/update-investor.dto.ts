import { IsNotEmpty } from "class-validator";

export class UpdateInvestorDto{
    @IsNotEmpty()
    investor_id: number;

    @IsNotEmpty()
    investor_name: string;

    @IsNotEmpty()
    cnic: string;

    @IsNotEmpty()
    phone: string;
}
import { IsNotEmpty } from "class-validator";
import { Investor } from "src/modules/investor/entity/Investor";

export class InvestorDto{
    @IsNotEmpty()
    investor: Investor[];

    @IsNotEmpty()
    investmentPercentage: number[];
}
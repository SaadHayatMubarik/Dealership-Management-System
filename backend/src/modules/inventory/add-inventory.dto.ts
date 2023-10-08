import { IsNotEmpty, IsOptional } from "class-validator";

export class AddInventoryDto{
    @IsNotEmpty()
    make: string;

    @IsNotEmpty()
    model: string;

    @IsNotEmpty()
    variant: string;

    @IsNotEmpty()
    year: number;

    @IsOptional()
    @IsNotEmpty()
    chasis_no: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    demand: number;

    @IsNotEmpty()
    date_of_purchase: string;

    @IsNotEmpty()
    color: string;

    @IsNotEmpty()
    engine_no: string;

    @IsNotEmpty()
    comments: string;

    @IsNotEmpty()
    grade: number;

    @IsOptional()
    reg_no: string;
}
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

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
    // @IsNotEmpty()
    chasisNo: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    demand: number;

    @IsNotEmpty()
    dateOfPurchase: Date;

    @IsNotEmpty()
    dateOfSale: string;

    @IsNotEmpty()
    color: string;

    @IsNotEmpty()
    engineNo: string;

    @IsNotEmpty()
    comments: string;

    @IsNotEmpty()
    @IsNumber()
    grade: number;

    @IsOptional()
    regNo: string;
}
import { IsNotEmpty, IsNumber, IsOptional,IsEnum } from "class-validator";
import { InventoryStatus } from "./inventory-status.enum";

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
    dateOfPurchase: string;

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

    @IsNotEmpty()
    // @IsEnum(InventoryStatus, { default: InventoryStatus.UNSOLD})
    status: InventoryStatus;
    
    @IsOptional()
    regNo: string;
}
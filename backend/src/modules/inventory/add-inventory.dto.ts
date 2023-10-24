import { IsNotEmpty, IsNumber, IsOptional,IsEnum } from "class-validator";
import { InventoryStatus } from "./inventory-status.enum";

export class AddInventoryDto{
    @IsNotEmpty()
    vehicleMake: string;

    @IsNotEmpty()
    vehicleModel: string;

    @IsNotEmpty()
    vehicleVariant: string;

    @IsNotEmpty()
    modelYear: number;

    @IsOptional()
    // @IsNotEmpty()
    vehicleChasisNo: string;

    @IsNotEmpty()
    costPrice: number;

    @IsNotEmpty()
    demand: number;

    @IsNotEmpty()
    dateOfPurchase: string;

    @IsNotEmpty()
    dateOfSale: string;

    @IsNotEmpty()
    bodyColor: string;

    @IsNotEmpty()
    engineNo: string;

    @IsNotEmpty()
    comments: string;

    @IsNotEmpty()
    @IsNumber()
    grade: number;

    // @IsNotEmpty()
    @IsOptional()
    // @IsEnum(InventoryStatus, { default: InventoryStatus.UNSOLD})
    status: InventoryStatus;
    
    @IsOptional()
    regNo: string;
}
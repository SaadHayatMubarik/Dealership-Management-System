import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { VehicleType } from "src/modules/vehicle-type/entity/Vehicle-type";
import { InventoryStatus } from "../inventory-status.enum";
import { StockAttributeValue } from "src/modules/stock-attribute-value/entity/Stock-attribute-value";
import { Customer } from "src/modules/customer/entity/Customer";

export class UpdateInventoryDto{
    @IsNotEmpty()
    inventoryId: number;

    @IsOptional()
    vehicleType: VehicleType;
    
    @IsOptional()
    vehicleMake: string;

    @IsOptional()
    vehicleModel: string;

    @IsOptional()
    vehicleVariant: string;

    @IsOptional()
    modelYear: number;

    @IsOptional()
    vehicleChasisNo: string;

    @IsOptional()
    costPrice: number;

    @IsOptional()
    demand: number;

    @IsOptional()
    dateOfPurchase: Date;

    @IsOptional()
    dateOfSale: Date;

    @IsOptional()
    bodyColor: string;

    @IsOptional()
    engineNo: string;

    @IsOptional()
    comments: string;

    @IsOptional()
    @IsNumber()
    grade: number;

    @IsOptional()
    status: InventoryStatus;
    
    @IsOptional()
    regNo: string;

    @IsOptional()
    mileage: number;

    @IsOptional()
    sellingPrice: number;

    @IsOptional()
    buyerId: number;

    // @IsOptional()
    // // stockAttributeValue: StockAttributeValue[];
    // value: string[];

}
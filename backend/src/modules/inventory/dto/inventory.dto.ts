import { IsNotEmpty, IsNumber, IsOptional,IsEnum } from "class-validator";
import { InventoryStatus } from "../inventory-status.enum";
import { StockAttributeValue } from "src/modules/stock-attribute-value/entity/Stock-attribute-value";
import { Showroom } from "src/modules/showroom/entity/Showroom";
import { VehicleType } from "src/modules/vehicle-type/entity/Vehicle-type";

export class InventoryDto{

    @IsNotEmpty()
    vehicleType: VehicleType;
    
    @IsNotEmpty()
    vehicleMake: string;

    @IsNotEmpty()
    vehicleModel: string;

    @IsNotEmpty()
    vehicleVariant: string;

    @IsNotEmpty()
    modelYear: number;

    @IsOptional()
    vehicleChasisNo: string;

    @IsNotEmpty()
    costPrice: number;

    @IsNotEmpty()
    demand: number;

    @IsNotEmpty()
    dateOfPurchase: string;

    @IsOptional()
    dateOfSale: string;

    @IsNotEmpty()
    bodyColor: string;

    @IsNotEmpty()
    engineNo: string;

    @IsOptional()
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
    
    @IsNotEmpty()
    showroomId: number;

    @IsNotEmpty()
    value:string[];

    @IsNotEmpty()
    attributeValueId: number[];
}
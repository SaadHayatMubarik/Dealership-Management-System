import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { VehicleType } from "src/modules/vehicle-type/entity/Vehicle-type";
import { InventoryStatus } from "../inventory-status.enum";
import { StockAttributeValue } from "src/modules/stock-attribute-value/entity/Stock-attribute-value";
// import { Customer } from "src/modules/customer/entity/Customer";

export class UpdateInventoryDto{
    @IsNotEmpty()
    inventory_id: number;

    // @IsOptional()
    // vehicleType: VehicleType;
    
    @IsOptional()
    make: string;

    @IsOptional()
    model: string;

    @IsOptional()
    variant: string;

    @IsOptional()
    year: number;

    @IsOptional()
    chasis_no: string;

    @IsOptional()
    price: number;

    @IsOptional()
    demand: number;

    @IsOptional()
    date_of_purchase: Date;

    @IsOptional()
    date_of_sale: Date;

    @IsOptional()
    color: string;

    @IsOptional()
    engine_no: string;

    @IsOptional()
    comments: string;

    @IsOptional()
    @IsNumber()
    grade: number;

    @IsOptional()
    status: InventoryStatus;
    
    @IsOptional()
    reg_no: string;

    @IsOptional()
    mileage: number;

    @IsOptional()
    selling_Price: number;

    @IsOptional()
    buyerId: number;

    // @IsOptional()
    // // stockAttributeValue: StockAttributeValue[];
    // value: string[];

}
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { InventoryStatus } from "../inventory-status.enum";


export class UpdateInventoryDto{
    @IsNotEmpty()
    inventory_id: number;
    
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
    selling_price: number;

    @IsOptional()
    buyer_id: number;

}
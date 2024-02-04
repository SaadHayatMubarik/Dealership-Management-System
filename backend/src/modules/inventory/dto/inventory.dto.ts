import { IsNotEmpty, IsNumber, IsOptional,IsEnum } from "class-validator";
import { InventoryStatus } from "../inventory-status.enum";
import { StockAttributeValue } from "src/modules/stock-attribute-value/entity/Stock-attribute-value";
import { Showroom } from "src/modules/showroom/entity/Showroom";
import { VehicleType } from "src/modules/vehicle-type/entity/Vehicle-type";
import { CustomerCatagory } from "src/modules/customer/customer-catagory.enum";
import { Investor } from "src/modules/investor/entity/Investor";

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
    dateOfPurchase: Date;

    @IsOptional()
    dateOfSale: Date;

    @IsNotEmpty()
    bodyColor: string;

    @IsOptional()
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
    mileage: number;
    
    @IsNotEmpty()
    showroomId: number;

    @IsNotEmpty()
    stockAttributeValue: StockAttributeValue[];

    @IsNotEmpty()
    customerCategory: CustomerCatagory;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    contactNo: string;

    @IsNotEmpty()
    customerEmail: string;

    @IsNotEmpty()
    province: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    address: string;

    @IsOptional()
    cnic: string;

    @IsNotEmpty()
    investor: Investor[];

    @IsNotEmpty()
    investmentPercentage: number[];

}
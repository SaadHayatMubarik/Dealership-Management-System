import { IsNotEmpty, IsOptional } from "class-validator";
import { VehicleType } from "src/modules/vehicle-type/entity/Vehicle-type";

export class GetInventroyDto{
    @IsNotEmpty()
    inventoryId: number;

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
    demand: number;

    @IsNotEmpty()
    mileage: number;

    @IsNotEmpty()
    comments: string;

    @IsNotEmpty()
    vehicleType: string;
}
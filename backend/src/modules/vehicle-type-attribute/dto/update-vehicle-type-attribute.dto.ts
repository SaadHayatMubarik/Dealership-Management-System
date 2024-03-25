import { IsNotEmpty, IsOptional } from "class-validator";
import { VehicleType } from "src/modules/vehicle-type/entity/Vehicle-type";

export class UpdateVehicleTypeAttributeDto{

    @IsOptional()
    multiValueId?: number[];

    @IsOptional()
    vehicleAttributeValue?: string[];

    @IsNotEmpty()
    vehicleAttributeId: number;
    
    @IsNotEmpty()
    vehicleAttributeName: string;

    @IsNotEmpty()
    attributeInputType: string;

    @IsNotEmpty()
    vehicleType: VehicleType

    // @IsOptional()
    // vehicleAttributeValue?: string[];
}
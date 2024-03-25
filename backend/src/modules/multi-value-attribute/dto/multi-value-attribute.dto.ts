import { IsNotEmpty, IsOptional } from "class-validator";
import { VehicleType } from "src/modules/vehicle-type/entity/Vehicle-type";

export class MultiValueAttributeDto{
    @IsOptional()
    multiValue?: any[];

    @IsNotEmpty()
    vehicleAttributeId: number;

    @IsNotEmpty()
    vehicleAttributeName: string;

    @IsNotEmpty()
    attributeInputType: string;

    @IsNotEmpty()
    vehicleType: VehicleType;
}
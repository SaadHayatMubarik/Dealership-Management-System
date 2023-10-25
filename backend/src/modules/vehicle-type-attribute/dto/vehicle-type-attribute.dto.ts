import { IsNotEmpty } from "class-validator";
import { VehicleType } from "src/modules/vehicle-type/entities/Vehicle-type";
export class VehicleTypeAttributeDto{
    @IsNotEmpty()
    vehicleAttributeName: string;

    @IsNotEmpty()
    attributeInputType: string;

    @IsNotEmpty()
    vehicleTypeId: VehicleType;

    @IsNotEmpty()
    vehicleAttributeValue: string[];

}
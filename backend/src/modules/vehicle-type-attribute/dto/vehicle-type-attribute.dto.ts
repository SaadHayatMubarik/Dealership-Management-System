import { IsNotEmpty } from "class-validator";
import { VehicleType } from "src/modules/vehicle-type/entity/Vehicle-type";
// import { VehicleType } from "src/modules/vehicle-type/entities/Vehicle-type";
export class VehicleTypeAttributeDto{
    @IsNotEmpty()
    vehicleAttributeName: string;

    @IsNotEmpty()
    attributeInputType: string;

    @IsNotEmpty()
    vehicleType: VehicleType;

    @IsNotEmpty()
    vehicleAttributeValue: string[];

    @IsNotEmpty()
    showroomId: number;

}
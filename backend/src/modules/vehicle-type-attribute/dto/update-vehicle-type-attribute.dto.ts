import { IsNotEmpty, IsOptional } from "class-validator";
import { VehicleType } from "src/modules/vehicle-type/entity/Vehicle-type";

export class UpdateVehicleTypeAttributeDto{

    @IsNotEmpty()
    attribute_id: number;
    
    @IsNotEmpty()
    attribute_name: string;


}
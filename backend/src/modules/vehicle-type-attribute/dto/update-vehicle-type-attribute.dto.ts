import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateVehicleTypeAttributeDto{
    @IsNotEmpty()
    vehicleAttributeId: number;
    
    @IsOptional()
    vehicleAttributeName?: string;

    // @IsOptional()
    // vehicleAttributeValue?: string[];
}
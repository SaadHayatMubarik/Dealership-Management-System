import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateVehicleTypeAttributeDto{

    @IsOptional()
    multiValueId?: number[];

    @IsOptional()
    vehicleAttributeValue?: string[];

    @IsOptional()
    vehicleAttributeId: number;
    
    @IsOptional()
    vehicleAttributeName?: string;

    // @IsOptional()
    // vehicleAttributeValue?: string[];
}
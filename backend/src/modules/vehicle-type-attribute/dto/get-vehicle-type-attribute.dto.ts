import { IsNotEmpty } from "class-validator";
export class GetVehicleTypeAttributeDto{
    @IsNotEmpty()
    vehicleAttributeId: number;
    
    @IsNotEmpty()
    vehicleAttributeName: string;

    @IsNotEmpty()
    attributeInputType: string;

    @IsNotEmpty()
    multiValueId: number[];
    
    @IsNotEmpty()
    vehicleAttributeValue: string[];

    @IsNotEmpty()
    vehicleTypeName: string;
}
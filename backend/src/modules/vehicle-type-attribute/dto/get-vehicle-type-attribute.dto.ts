import { IsNotEmpty } from "class-validator";
export class GetVehicleTypeAttributeDto{
    @IsNotEmpty()
    vehicleAttributeName: string;

    @IsNotEmpty()
    attributeInputType: string;

    @IsNotEmpty()
    vehicleAttributeValue: string;

    @IsNotEmpty()
    vehicleTypeName: string;
}
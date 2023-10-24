import { IsNotEmpty } from "class-validator";
export class VehicleTypeAttributeDto{
    @IsNotEmpty()
    vehicleAttributeName: string;

    @IsNotEmpty()
    attributeInputType: string;

    @IsNotEmpty()
    vehicleTypeId: number;

    @IsNotEmpty()
    vehicleAttributeValue: string[];

}
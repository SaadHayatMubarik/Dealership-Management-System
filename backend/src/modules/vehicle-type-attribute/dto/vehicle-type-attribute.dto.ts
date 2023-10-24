import { IsNotEmpty } from "class-validator";

export class VehicleTypeAttributeDto{
    @IsNotEmpty()
    attributeName: string;

    @IsNotEmpty()
    inputType: string;

    @IsNotEmpty()
    vehicleTypeName: string;



}
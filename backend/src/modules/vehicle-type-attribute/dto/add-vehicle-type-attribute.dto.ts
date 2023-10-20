import { IsNotEmpty } from "class-validator";
export class AddVehicleTypeAttributeDto{
    @IsNotEmpty()
    attributeName: string;

    @IsNotEmpty()
    inputType: string;

    @IsNotEmpty()
    typeName: string;

    @IsNotEmpty()
    attributeValue: string;
}
import { IsNotEmpty } from "class-validator";

export class GetVehicleTypeAttributeDto{
    
    @IsNotEmpty()
    typeName: string;
}
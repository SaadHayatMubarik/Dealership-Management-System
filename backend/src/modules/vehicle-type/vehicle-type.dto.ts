import { IsNotEmpty } from "class-validator";

export class VehicleTypeDto {
    @IsNotEmpty()
    typeName: string;
}
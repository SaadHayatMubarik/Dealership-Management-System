import { IsNotEmpty } from "class-validator";

export class VehicleTypeDto {
    @IsNotEmpty()
    vehicleTypeName: string;
}
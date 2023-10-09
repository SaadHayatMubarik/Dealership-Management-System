import { IsNotEmpty } from "class-validator";

export class VehicleTypeDto {
    @IsNotEmpty()
    type_name: string;
}
import { IsNotEmpty } from "class-validator";

export class VehicleTypeDto {
    @IsNotEmpty()
    vehicleTypeName: string;

    constructor() {
        this.vehicleTypeName = ''; // Initialize in the constructor 
      }
}
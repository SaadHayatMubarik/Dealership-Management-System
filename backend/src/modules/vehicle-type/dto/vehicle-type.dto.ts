import { IsNotEmpty } from "class-validator";

export class VehicleTypeDto {
  
    @IsNotEmpty()
    vehicleTypeName: string;

    @IsNotEmpty()
    showroomId: number;

    // constructor() {
    //     this.vehicleTypeName = ''; // Initialize in the constructor 
    //   }
}
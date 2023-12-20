import { IsNotEmpty, IsOptional } from "class-validator";

export class GetInventroyDto{

    @IsNotEmpty()
    vehicleMake: string;

    @IsNotEmpty()
    vehicleModel: string;

    @IsNotEmpty()
    vehicleVariant: string;

    @IsNotEmpty()
    modelYear: number;

    @IsOptional()
    vehicleChasisNo: string;

    @IsNotEmpty()
    demand: number;

    @IsNotEmpty()
    bodyColor: string;
}
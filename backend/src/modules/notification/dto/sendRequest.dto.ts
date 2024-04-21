import { IsNotEmpty } from "class-validator";

export class SendRequestDto{
    @IsNotEmpty()
    inventoryId: number;

    @IsNotEmpty()
    showroomId: number;

    @IsNotEmpty()
    minValue: string;

    @IsNotEmpty()
    maxValue: string;
    
}
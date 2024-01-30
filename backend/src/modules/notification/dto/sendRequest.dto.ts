import { IsNotEmpty } from "class-validator";

export class SendRequestDto{
    @IsNotEmpty()
    inventoryId: number;

    @IsNotEmpty()
    showroomId: number;
}
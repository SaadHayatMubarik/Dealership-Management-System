import { IsNotEmpty, IsOptional } from "class-validator";
import { InventoryStatus } from "../inventory-status.enum";

export class GetInventoryByFilterDto{

    @IsNotEmpty()
    status?: InventoryStatus;

    @IsOptional()
    Keyword?: string;

    @IsNotEmpty()
    showroomId?: number;
}
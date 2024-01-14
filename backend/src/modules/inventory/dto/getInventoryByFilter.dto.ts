import { IsNotEmpty } from "class-validator";

export class GetInventoryByFilterDto{

    @IsNotEmpty()
    filterBy: string;

    @IsNotEmpty()
    Keyword: any;

    @IsNotEmpty()
    showroomId: number;
}
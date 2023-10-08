import { IsNotEmpty } from "class-validator";

export class AddStockAttributeValueDto{
    @IsNotEmpty()
    inventory_id: number;

    @IsNotEmpty()
    attribute_name: string;

    @IsNotEmpty()
    attribute_value: string;
}
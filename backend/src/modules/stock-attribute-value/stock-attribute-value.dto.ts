import { IsNotEmpty } from "class-validator";

export class StockAttributeValueDto{

    @IsNotEmpty()
    attributeName: string;

    @IsNotEmpty()
    attributeValue: string;
}
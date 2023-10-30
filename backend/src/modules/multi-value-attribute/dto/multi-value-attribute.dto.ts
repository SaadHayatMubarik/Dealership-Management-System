import { IsNotEmpty } from "class-validator";

export class MultiValueAttributeDto{
    @IsNotEmpty()
    attributeValue: string;

    @IsNotEmpty()
    attributeName: string;

    @IsNotEmpty()
    newAttributeValue: string;
}
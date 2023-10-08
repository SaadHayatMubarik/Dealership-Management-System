import { IsNotEmpty } from "class-validator";

export class AddMultiValueAttributeDto{
    @IsNotEmpty()
    attribute_value: string;

    @IsNotEmpty()
    attribute_name: string;
}